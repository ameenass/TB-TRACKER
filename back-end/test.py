import datetime
import json
from pydantic import BaseModel
from typing import Optional

with open("../data.json") as f:
    patients=json.load(f)


class Patient(BaseModel):
    _id:str
    id:str
    nom:str
    prenom:str
    ddn:Optional[str] = None
    age:int
    poids:int
    sex:str
    tlphn:str
    email:str
    adress:str
    localisationTB:str
    antecedents:str
    categorie:str
    comptageTuberculeux:str
    preuve:str

    

class Config:
     validate_assignment = True # ca c pour revalider a chaque fois les changements 

selected=[p for p in patients if p["nom"].lower().startswith("r")][0]

p=Patient(**selected)   #on cree une instance Patient a partir du dict selected
p.age="abc"

print(p)





from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS
from bson.objectid import ObjectId
from modeleP import PatientModel, SessionModel, FicheModel, MedecinModel, LoginModel
from pydantic import ValidationError
from datetime import date, datetime, timedelta
import secrets
import string
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
import jwt # This is for PyJWT, used for patient token generation

app = Flask(__name__)
CORS(app)

# --- JWT Secret Key Configuration ---
# Use a single, consistent secret key for both JWT managers (Flask-JWT-Extended and PyJWT)
# It's highly recommended to load this from an environment variable in a production setting.
COMMON_SECRET_KEY = "your_super_secret_and_long_key_for_all_jwts_here_1234567890" # <<< IMPORTANT: REPLACE WITH A STRONG, UNIQUE KEY

app.config['JWT_SECRET_KEY'] = COMMON_SECRET_KEY
jwt_manager = JWTManager(app) # Renamed to avoid collision with 'jwt' import (PyJWT library)
# Clé secrète pour JWT (à changer en production)
SECRET_KEY = "vraimenttopsecret"

# --- MongoDB Configuration ---
app.config["MONGO_URI"] = "mongodb://localhost:27017/tb_tracker"
# app.config["MONGO_URI"] = "mongodb+srv://msideneche:mohamed2003@cluster0.tjadpy9.mongodb.net/TBTracker" # Example Atlas URI
mongo = PyMongo(app)

# --- Database Connection Test Function ---
def test_database_connection():
    """Tests the MongoDB connection by sending a ping command."""
    try:
        mongo.db.command('ping')
        print("Database connection successful!")
        print(f"Connected to database: {mongo.db.name}")
        return True
    except Exception as e:
        print(f"Database connection failed: {e}")
        return False

# --- Swagger UI Setup ---
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={'app_name': "TB Tracker API"}
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

# --- MongoDB Collections ---
patients_collection = mongo.db.patients
medecins_collection = mongo.db.medecins
ficheTraitement = mongo.db.ficheTraitement
session_collection = mongo.db.session # Re-using session_collection as session below
sessions_collection = mongo.db.sessions # Explicitly use a plural name for the collection where sessions are stored

# --- Routes ---

@app.route('/')
def home():
    """Home route for the API."""
    return 'Bienvenue sur la page de TB Tracker!'

@app.route('/patients', methods=['POST'])
def add_patient():
    """Adds a new patient to the database."""
    try:
        data = request.get_json()

        # Generate a random 6-character password for IDPatient
        alphabet = string.ascii_letters + string.digits
        mdp_genere = ''.join(secrets.choice(alphabet) for _ in range(6))
        hashed_mdp = generate_password_hash(mdp_genere) # Hash the password before storing

        data['mot_de_passe'] = hashed_mdp
        data['IDPatient'] = mdp_genere  # Store the plain text generated password as IDPatient for patient login

        # Validate data with Pydantic model
        patient = PatientModel(**data)

        # Check if a patient with the same email already exists
        if patients_collection.find_one({"email": patient.email}):
            return jsonify({'error': "Un patient avec cet email existe déjà"}), 409

        patient_dict = patient.model_dump()

        # Convert DateNaissance to ISO format if it's a date object
        if isinstance(patient_dict.get('DateNaissance'), date):
            patient_dict['DateNaissance'] = patient_dict['DateNaissance'].isoformat()

        result = patients_collection.insert_one(patient_dict)

        return jsonify({
            'id': str(result.inserted_id),
            'msg': "Patient ajouté avec succès!",
            'mot_de_passe': mdp_genere # Return the plain text generated password for the user
        }), 201

    except ValidationError as e:
        return jsonify({'error': e.errors()}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/patients/<id>', methods=['GET'])
def getPatient(id):
    """Retrieves a single patient by their MongoDB ObjectId."""
    try:
        patient = patients_collection.find_one({'_id': ObjectId(id)})
        if not patient:
            return jsonify({'error': "Patient non trouvé"}), 404

        patient['_id'] = str(patient['_id'])  # Convert ObjectId to string for JSON serialization
        return jsonify(patient)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/patients', methods=['GET'])
def get_patients():
    """Retrieves all patients from the database."""
    try:
        patients = []
        for doc in patients_collection.find():
            doc['_id'] = str(doc['_id'])
            patients.append(doc)
        return jsonify(patients)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/patients/<IDPatient>', methods=['GET'])
def get_patient(IDPatient):
    """Retrieves a single patient by their IDPatient field or MongoDB ObjectId."""
    try:
        print(f"🔍 Looking for patient with IDPatient: {IDPatient}")

        # First try to find by IDPatient field (which stores the plain text generated password)
        patient = patients_collection.find_one({'IDPatient': IDPatient})
        print(f"🔍 Search by IDPatient field result: {patient is not None}")

        # If not found, try to find by _id (in case ObjectId is passed, though IDPatient is preferred for this endpoint)
        if not patient:
            try:
                if ObjectId.is_valid(IDPatient):
                    print(f"🔍 Trying search by ObjectId: {IDPatient}")
                    patient = patients_collection.find_one({'_id': ObjectId(IDPatient)})
                    print(f"🔍 Search by ObjectId result: {patient is not None}")
            except Exception as e:
                print(f"⚠️ Error trying ObjectId search: {e}")

        if not patient:
            print(f" Patient not found with IDPatient or ObjectId: {IDPatient}")
            return jsonify({'error': "Patient non trouvé"}), 404

        patient['_id'] = str(patient['_id'])
        print(f"✅ Patient found: {patient.get('nom', 'N/A')} {patient.get('prenom', 'N/A')}")
        return jsonify(patient)
    except Exception as e:
        print(f" Error in get_patient: {e}")
        return jsonify({'error': str(e)}), 500

@app.route("/login-patient", methods=['POST'])
def login_patient():
    """Handles patient login and generates a JWT token."""
    try:
        data = request.get_json()
        data = LoginModel(**data)

        # 1. Chercher patient par email
        patient = mongo.db.patients.find_one({"email": data.email})
        if not patient:
            return jsonify({"message": "Utilisateur non trouvé"}), 404

        # Vérifier le mot de passe
        if not check_password_hash(patient.get("mot_de_passe", ""), data.mot_de_passe):
            return jsonify({"message": "Identifiants invalides"}), 401

        # 2. Chercher fiche traitement par IDPatient
        fiche = mongo.db.ficheTraitement.find_one({"IDPatient": str(patient["_id"])})
        if not fiche:
            return jsonify({"message": "Fiche de traitement non trouvée"}), 404

        # 3. Chercher *toutes les sessions* par idfich
        # CHANGE: Use find() instead of find_one() to get all sessions
        all_sessions = list(mongo.db.sessions.find({"idfich": str(fiche["idfich"])}))

        # Création du token JWT
        payload = {
            "email": data.email,
            "idfiche": str(fiche["_id"]),
            "exp": datetime.utcnow() + timedelta(hours=2)
        }
        token = jwt.encode(payload,SECRET_KEY, algorithm="HS256") # Ensure SECRET_KEY is defined

        # Préparation des données utilisateur
        user_data = {
            "email": data.email,
            "nom": patient.get("nom", ""),
            "prenom": patient.get("prenom", ""),
            "fiche": {
                "id": str(fiche["_id"]),
                "date_debut": fiche.get("date_debut"),
                "statut": fiche.get("statut", ""),
                "categorie": fiche.get("categorie", ""),
                "preuve": fiche.get("preuve", ""),
                "selectedSousType": fiche.get("selectedSousType", ""),
                "Comptage_tuberculeux": fiche.get("Comptage_tuberculeux", False),
                "antecedents": fiche.get("antecedents", []),
                "poidsInitial": fiche.get("poidsInitial", 0.0),
                "note": fiche.get("note", ""),
                "contraception": fiche.get("contraception", False),
            },
            "sessions": [] # CHANGE: Use "sessions" (plural) to hold a list
        }

        # Process all found sessions
        for session_doc in all_sessions: # Loop through all sessions
            session_data = {
                "_id": str(session_doc["_id"]),
                "statut": session_doc.get("statut"),
                "dateDebut": session_doc.get("dateDebut"),
                "dateFin": session_doc.get("dateFin"),
                "notes": session_doc.get("notes", []),
                "rendezVous": session_doc.get("rendezVous", []),
                "effetsSignales": session_doc.get("effetsSignales", []),
                "traitement": session_doc.get("traitement"),
                "suspensions": session_doc.get("suspensions", []),
                "consultation": session_doc.get("consultation"),
            }
            user_data["sessions"].append(session_data) # Add to the list

        return jsonify({
            "message": "Login réussi",
            "token": token,
            "user": user_data
        }), 200

    except ValidationError as e:
        return jsonify({"errors": e.errors()}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/login-medecin', methods=['POST'])
def login_medecin():
    """Handles doctor login and generates a JWT token."""
    try:
        data = request.get_json()
        validated_data = MedecinModel(**data)
        nom = validated_data.nom
        password = validated_data.mot_de_passe

        medecin = medecins_collection.find_one({"nom": nom})
        if not medecin:
            return jsonify({'error': "Médecin non trouvé"}), 404

        if not check_password_hash(medecin['mot_de_passe'], password):
            return jsonify({'error': "Mot de passe incorrect"}), 401

        # Use Flask-JWT-Extended's create_access_token (uses app.config['JWT_SECRET_KEY'])
        access_token = create_access_token(identity=nom)

        return jsonify({
            'msg': "Connexion réussie!",
            'token': access_token,
            'nomMedecin': nom
        }), 200

    except ValidationError as e:
        return jsonify({'error': e.errors()}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/patients/<IDPatient>', methods=['DELETE'])
def delete_patient(IDPatient):
    """Deletes a patient by their MongoDB ObjectId."""
    try:
        result = patients_collection.delete_one({'_id': ObjectId(IDPatient)})
        if result.deleted_count == 0:
            return jsonify({'error': "Patient non trouvé"}), 404
        return jsonify({'msg': "Patient supprimé avec succès!"})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/ajouter_fiche', methods=['POST'])
def ajouter_fiche():
    """Adds a new treatment fiche and links it to a patient."""
    try:
        data = request.get_json()
        print(f"Data received for adding fiche: {data}")

        # If date_debut is not provided, set it to today's date
        if 'date_debut' not in data:
            data['date_debut'] = date.today().isoformat() # Ensure consistent string format if default

        # Create Pydantic model instance
        fiche = FicheModel(**data)
        fiche_dict = fiche.model_dump(by_alias=True) # Use by_alias if you have aliased fields

        # Convert date objects to ISO format strings for MongoDB storage
        for field in ['date_debut', 'date_cloture']:
            if field in fiche_dict and isinstance(fiche_dict[field], (date, datetime)):
                fiche_dict[field] = fiche_dict[field].isoformat()

        # Insert into ficheTraitement collection
        insert_result = mongo.db.ficheTraitement.insert_one(fiche_dict)
        print(f"Fiche inserted with ID: {insert_result.inserted_id}")

        # Update the patient document to link the new fiche using their IDPatient
        # Assuming fiche.IDPatient holds the plain-text IDPatient string
        update_result = mongo.db.patients.update_one(
            {"IDPatient": fiche.IDPatient}, # Use IDPatient for linking
            {"$push": {"fiches": fiche.idfich}} # Pushing the idfich string
        )

        if update_result.modified_count == 0:
            print(f"Warning: Fiche added, but patient with IDPatient '{fiche.IDPatient}' not found for update.")
            return jsonify({"warning": "Fiche ajoutée, mais patient non trouvé pour mise à jour."}), 201

        return jsonify({"message": "Fiche ajoutée et liée au patient avec succès"
                                   #     ,"idfich": fiche.idfich  # <--- ADD THIS LINE
}), 201

    except ValidationError as ve:
        print(f"Validation Error in ajouter_fiche: {ve.errors()}")
        return jsonify({"validation_error": ve.errors()}), 400
    except Exception as e:
        print(f"Server Error in ajouter_fiche: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/fiches/<idfich>/statut', methods=['PUT'])
def update_fiche_statut(idfich):
    """Updates the status of a treatment fiche."""
    try:
        data = request.get_json()
        nouveau_statut = data.get('statut')

        if nouveau_statut is None: # Check for None, as bool can be False
            return jsonify({"error": "Statut manquant"}), 400

        result = ficheTraitement.update_one(
            {'idfich': idfich},
            {'$set': {'statut': nouveau_statut}}
        )

        if result.matched_count == 0:
            return jsonify({'error': 'Fiche non trouvée'}), 404

        return jsonify({'message': 'Statut mis à jour avec succes'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/rendezvous', methods=['POST'])
def create_rendezvous():
    """Creates a new rendezvous."""
    data = request.json
    res = mongo.db.rendezvous.insert_one(data)
    return jsonify({"message": "Rendez-vous créé", "id": str(res.inserted_id)}), 201

@app.route('/consultations', methods=['POST'])
def create_consultation():
    """Creates a new consultation record."""
    data = request.json
    res = mongo.db.consultations.insert_one(data)
    return jsonify({"message": "Consultation créée", "id": str(res.inserted_id)}), 201

@app.route('/effets-signales', methods=['POST'])
def create_effet_signale():
    """Creates a new reported side effect record."""
    data = request.json
    res = mongo.db.effets_signales.insert_one(data)
    return jsonify({"message": "Effet signalé enregistré", "id": str(res.inserted_id)}), 201

@app.route('/sessions', methods=['POST'])
def create_session():
    """Creates a new session for a patient's treatment fiche."""
    try:
        data = request.json
        print(f"Received data for session creation: {data}")

        session_model = SessionModel(**data) # Use a different variable name to avoid conflict with `session` collection

        # Handle rendezVous: insert and store details
        rendezVous_list = []
        if session_model.rendezVous:
           for rdv_date_str in session_model.rendezVous:
               # Ensure date string is valid, or convert if needed (e.g., from frontend date picker)
               # For now, assuming rdv_date_str is a simple string to be stored as is
               rdv_result = mongo.db.rendezvous.insert_one({"date": rdv_date_str, "idfich": session_model.idfich})
               rendezVous_list.append({
                "_id": str(rdv_result.inserted_id),
                "date": rdv_date_str
               })

        # Handle effetsSignales: insert and store details
        effets_signales_list = []
        if session_model.effetsSignales:
            for effet in session_model.effetsSignales:
                effet_doc = effet.model_dump()
                mongo.db.effets_signales.insert_one(effet_doc) # Store in dedicated collection
                effets_signales_list.append(effet_doc) # Store full effect details in session as well

        # Prepare the session document for MongoDB insertion
        session_dict = session_model.model_dump()
        session_dict["dateDebut"] = session_model.dateDebut.isoformat()
        session_dict["dateFin"] = session_model.dateFin.isoformat() if session_model.dateFin else None
        session_dict["effetsSignales"] = effets_signales_list
        session_dict["rendezVous"] = rendezVous_list # Store the list of rendezvous objects

        # Handle notes: convert datetime objects to ISO format strings
        if session_model.notes:
            session_dict["notes"] = [
                {"text": note.text, "date": note.date.isoformat()} for note in session_model.notes
            ]

        # Handle suspensions: convert datetime objects to ISO format strings
        if session_model.suspensions:
            session_dict["suspensions"] = [
                {"startDate": susp.startDate.isoformat(), "endDate": susp.endDate.isoformat(), "note": susp.note}
                for susp in session_model.suspensions
            ]

        # Insert the session into the 'sessions' collection
        res = sessions_collection.insert_one(session_dict) # Use sessions_collection

        return jsonify({
            "message": "Session enregistrée",
            "session_id": str(res.inserted_id)
        }), 201

    except ValidationError as ve:
        print(f"Validation Error in create_session: {ve.errors()}")
        return jsonify({"validation_error": ve.errors()}), 400
    except Exception as e:
        print(f"Server Error in create_session: {e}")
        return jsonify({"error": str(e)}), 400

@app.route('/sessions/<string:session_id>/cloturer', methods=['PUT'])
def cloturer_session(session_id):
    """Closes a session by setting its status to False."""
    try:
        result = sessions_collection.update_one( # Use sessions_collection
            {"_id": ObjectId(session_id)},
            {"$set": {"statut": False, "dateFin": datetime.utcnow().isoformat()}} # Also set dateFin on close
        )

        if result.matched_count == 0:
            return jsonify({"error": "Session non trouvée"}), 404

        return jsonify({"message": "Session clôturée avec succès."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/sessions/fiche/<string:idfich>", methods=["GET"])
def get_sessions_by_fiche(idfich):
    """Retrieves all sessions associated with a specific treatment fiche."""
    try:
        print(f"🔍 Searching for sessions with idfich: {idfich}")
        sessions = list(sessions_collection.find({"idfich": idfich})) # Use sessions_collection
        print(f"📊 Found {len(sessions)} sessions")
        for s in sessions:
            s["_id"] = str(s["_id"])  # Convert ObjectId for JSON serialization
            # Ensure nested datetime objects are converted if they exist in the DB
            if 'dateDebut' in s and isinstance(s['dateDebut'], datetime):
                s['dateDebut'] = s['dateDebut'].isoformat()
            if 'dateFin' in s and isinstance(s['dateFin'], datetime):
                s['dateFin'] = s['dateFin'].isoformat()
            if 'notes' in s and isinstance(s['notes'], list):
                for note in s['notes']:
                    if 'date' in note and isinstance(note['date'], datetime):
                        note['date'] = note['date'].isoformat()
            if 'suspensions' in s and isinstance(s['suspensions'], list):
                for susp in s['suspensions']:
                    if 'startDate' in susp and isinstance(susp['startDate'], datetime):
                        susp['startDate'] = susp['startDate'].isoformat()
                    if 'endDate' in susp and isinstance(susp['endDate'], datetime):
                        susp['endDate'] = susp['endDate'].isoformat()

        return jsonify(sessions), 200
    except Exception as e:
        print(f"❌ Error in get_sessions_by_fiche: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/sessions/<session_id>', methods=['PUT'])
def update_session(session_id):
    """Updates specific fields of an existing session."""
    try:
        data = request.json
        if not data:
            return jsonify({"error": "Aucune donnée fournie"}), 400

        update_fields = {}
        for key in ["rendezVous", "notes", "effetsSignales", "suspensions", "traitement", "statut", "dateFin"]:
            if key in data:
                # Convert date/datetime strings from frontend to datetime objects for storage if needed
                # Or ensure data is already in correct format from frontend
                if key in ["dateDebut", "dateFin"] and isinstance(data[key], str):
                    try:
                        update_fields[key] = datetime.fromisoformat(data[key])
                    except ValueError:
                        # Handle cases where date string is not ISO format if necessary
                        update_fields[key] = data[key]
                elif key in ["notes"]:
                    # Convert note dates
                    update_fields[key] = [
                        {"text": note['text'], "date": datetime.fromisoformat(note['date'])}
                        for note in data[key] if 'date' in note
                    ]
                elif key in ["rendezVous"]:
                    # Rendezvous is a list of strings, no conversion needed.
                    update_fields[key] = data[key]
                elif key in ["effetsSignales"]:
                    # EffetsSignales are objects, ensure their internal dates are converted
                    update_fields[key] = [
                        {**effet, **({'dateDebut': datetime.fromisoformat(effet['dateDebut'])} if 'dateDebut' in effet and isinstance(effet['dateDebut'], str) else {}),
                         **({'dateDeSignalement': datetime.fromisoformat(effet['dateDeSignalement'])} if 'dateDeSignalement' in effet and isinstance(effet['dateDeSignalement'], str) else {})}
                        for effet in data[key]
                    ]
                elif key in ["suspensions"]:
                    # Suspensions have start and end dates
                    update_fields[key] = [
                        {**susp, **({'startDate': datetime.fromisoformat(susp['startDate'])} if 'startDate' in susp and isinstance(susp['startDate'], str) else {}),
                         **({'endDate': datetime.fromisoformat(susp['endDate'])} if 'endDate' in susp and isinstance(susp['endDate'], str) else {})}
                        for susp in data[key]
                    ]
                else:
                    update_fields[key] = data[key]


        if not update_fields:
            return jsonify({"error": "Aucun champ valide à mettre à jour"}), 400

        result = sessions_collection.update_one( # Use sessions_collection
            {"_id": ObjectId(session_id)},
            {"$set": update_fields}
        )

        if result.matched_count == 0:
            return jsonify({"error": "Session non trouvée"}), 404

        if result.modified_count == 0:
            return jsonify({"message": "Aucune modification apportée"}), 200

        return jsonify({"message": "Session mise à jour avec succès"}), 200

    except Exception as e:
        print(f"Error updating session {session_id}: {e}")
        return jsonify({"error": f"Erreur serveur : {str(e)}"}), 500

@app.route('/patients/<IDPatient>/fiches', methods=['GET'])
def get_fiches_by_patient(IDPatient):
    """Retrieves all treatment fiches associated with a specific patient."""
    try:
        fiches = list(ficheTraitement.find({"IDPatient": IDPatient}))
        for fiche in fiches:
            fiche['_id'] = str(fiche['_id'])  # convert ObjectId
            # Ensure dates are ISO format strings for JSON
            if 'date_debut' in fiche and isinstance(fiche['date_debut'], date):
                fiche['date_debut'] = fiche['date_debut'].isoformat()
            if 'date_cloture' in fiche and isinstance(fiche['date_cloture'], date):
                fiche['date_cloture'] = fiche['date_cloture'].isoformat()
        return jsonify(fiches)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/fiches/<idfich>', methods=['GET'])
def get_fiche(idfich):
    """Retrieves a single treatment fiche by its idfich."""
    try:
        print(f"🔍 Looking for fiche with idfich: {idfich}")
        fiche = ficheTraitement.find_one({'idfich': idfich})
        if not fiche:
            print(f"❌ Fiche not found with idfich: {idfich}")
            return jsonify({'error': "Fiche non trouvée"}), 404

        print(f"✅ Fiche found: {fiche.get('idfich', 'N/A')}")
        print(f"📋 Fiche IDPatient: {fiche.get('IDPatient', 'N/A')}")

        fiche['_id'] = str(fiche['_id'])
        # Ensure dates are ISO format strings for JSON
        if 'date_debut' in fiche and isinstance(fiche['date_debut'], date):
            fiche['date_debut'] = fiche['date_debut'].isoformat()
        if 'date_cloture' in fiche and isinstance(fiche['date_cloture'], date):
            fiche['date_cloture'] = fiche['date_cloture'].isoformat()
        return jsonify(fiche)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/modifierfiches/<idfich>', methods=['PUT'])
def modifier_fiche(idfich):
    """Modifies an existing treatment fiche."""
    try:
        fiche = mongo.db.ficheTraitement.find_one({"idfich": idfich})
        if not fiche:
            return jsonify({"error": "Fiche non trouvée"}), 404

        # Check if the fiche is 'frozen' based on date_cloture
        if 'date_cloture' in fiche and fiche['date_cloture']: # Check if date_cloture exists and is not empty
            # Convert the stored date string to a date object for comparison
            try:
                date_cloture_obj = date.fromisoformat(fiche['date_cloture'].split('T')[0]) # Split to handle potential time part
            except ValueError:
                # Handle cases where stored date_cloture might not be in a valid ISO format
                print(f"Warning: date_cloture for fiche {idfich} not in valid ISO format: {fiche['date_cloture']}")
                date_cloture_obj = date.min # Treat as very old, so typically modifiable

            if date_cloture_obj <= date.today():
                return jsonify({"message": "Cette fiche est figée et ne peut plus être modifiée."}), 403

        data = request.get_json()

        # Update date fields in data if they are present and need conversion
        for field in ['date_debut', 'date_cloture']:
            if field in data and isinstance(data[field], str):
                try:
                    data[field] = date.fromisoformat(data[field].split('T')[0]) # Convert back to date object if frontend sends string
                except ValueError:
                    pass # Keep as string if not a valid date, or handle error

        mongo.db.ficheTraitement.update_one({"idfich": idfich}, {"$set": data})
        return jsonify({"message": "Fiche modifiée avec succès"})
    except Exception as e:
        print(f"Error modifying fiche {idfich}: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    print("🚀 Starting TB Tracker Server...")
    print("=" * 50)

    # Test database connection
    if test_database_connection():
        try:
            # List collections to show database info
            collections = mongo.db.list_collection_names()
            print(f"📁 Available collections: {collections}")
        except Exception as e:
            print(f"⚠️  Warning: Could not list collections: {e}")

    # Create a default doctor (to be removed later if not needed)
    try:
        if not medecins_collection.find_one({"nom": "Toumi"}):
            medecins_collection.insert_one({
                "nom": "Toumi",
                "mot_de_passe": generate_password_hash("motDePasse123")
            })
            print(" ✅ Default doctor 'Toumi' created.")
        else:
            print(" ℹ️ Default doctor 'Toumi' already exists.")
    except Exception as e:
        print(f"⚠️  Warning: Could not create/check default doctor: {e}")

    print("=" * 50)
    print("🌐 Server is starting on http://localhost:5000")
    print("📚 Swagger API documentation available at: http://localhost:5000/swagger")
    print("🐛 Debug mode: ON")
    print("=" * 50)

    app.run(debug=True)
