from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS
from bson.objectid import ObjectId
from modeleP import PatientModel, SessionModel, FicheModel, MedecinModel
from pydantic import ValidationError
from datetime import date
import secrets
import string
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient


app = Flask(__name__)
CORS(app) 

caracteres = string.ascii_letters + string.digits
cle_secrete = '' .join(secrets.choice(caracteres) for _ in range(12))
app.config['JWT_SECRET_KEY'] = cle_secrete

#app.config['JWT_SECRET_KEY'] = 'TaCléSecrète'  
jwt = JWTManager(app)  

# app.config["MONGO_URI"] = "mongodb://localhost:27017/tb_tracker"
app.config["MONGO_URI"] = "mongodb+srv://msideneche:mohamed2003@cluster0.tjadpy9.mongodb.net/TBTracker"
mongo = PyMongo(app)

# Test database connection
def test_database_connection():
    try:
        # Test the connection by attempting to access the database
        mongo.db.command('ping')
        print("✅ Database connection successful!")
        print(f"📊 Connected to database: {mongo.db.name}")
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False


SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL, 
    API_URL, 
    config={'app_name': "TB Tracker API"}
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)


patients_collection = mongo.db.patients
medecins_collection = mongo.db.medecins
ficheTraitement = mongo.db.ficheTraitement
session_collection = mongo.db.session
session = mongo.db.session


@app.route('/')
def home():
    return 'Bienvenue sur la page de TB Tracker!'

@app.route('/patients', methods=['POST'])
def add_patient():
    try:
        data = request.get_json()

        alphabet = string.ascii_letters + string.digits
        mdp_genere = ''.join(secrets.choice(alphabet) for _ in range(6))
        hashed_mdp = generate_password_hash(mdp_genere) # on le hache avant de l'utiliser non lisible
        data['mot_de_passe'] = hashed_mdp
        data['IDPatient'] = mdp_genere  # Set the plain text password as IDPatient for searching

        patient = PatientModel(**data)

        if patients_collection.find_one({"email": patient.email}):
            return jsonify({'error': "Un patient avec cet email existe déjà"}), 409

        patient_dict = patient.model_dump()
        
        if isinstance(patient_dict.get('DateNaissance'), date):
            patient_dict['DateNaissance'] = patient_dict['DateNaissance'].isoformat()

        result =patients_collection.insert_one(patient_dict)

        return jsonify({
            'id': str(result.inserted_id),
            'msg': "Patient ajouté avec succès!",
            'IDPatient': mdp_genere  # On retourne le mot de passe généré pour l'informer
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/login', methods=['POST'])
def login_medecin():
    try:
        data = request.get_json()
        nom = data.get('nom')
        password = data.get('mot_de_passe')

        if not nom or not password:
            return jsonify({'error': "Nom et mot de passe requis"}), 400

        medecin = medecins_collection.find_one({"nom": nom})
        if not medecin:
            return jsonify({'error': "Médecin non trouvé"}), 404

        if not check_password_hash(medecin['mot_de_passe'], password):
            return jsonify({'error': "Mot de passe incorrect"}), 401

        access_token = create_access_token(identity=nom) #le nom est encodé --> pour connaitre a les prochaines cnx l'identite de medecin

        return jsonify({
            'msg': "Connexion réussie!",
            'token': access_token, #contient le nom encodé
            'nomMedecin': nom
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@app.route('/patients', methods=['GET'])
def get_patients():
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
    try:
        print(f"🔍 Looking for patient with IDPatient: {IDPatient}")
        
        # First try to find by IDPatient field
        patient = patients_collection.find_one({'IDPatient': IDPatient})
        print(f"🔍 Search by IDPatient field result: {patient is not None}")
        
        # If not found, try to find by _id (in case ObjectId is passed)
        if not patient:
            try:
                if ObjectId.is_valid(IDPatient):
                    print(f"🔍 Trying search by ObjectId: {IDPatient}")
                    patient = patients_collection.find_one({'_id': ObjectId(IDPatient)})
                    print(f"🔍 Search by ObjectId result: {patient is not None}")
            except Exception as e:
                print(f"⚠️ Error trying ObjectId search: {e}")
        
        if not patient:
            print(f"❌ Patient not found with IDPatient: {IDPatient}")
            # Let's also check what patients exist in the database
            all_patients = list(patients_collection.find({}, {'IDPatient': 1, 'nom': 1, 'prenom': 1}))
            print(f"📋 Available patients in database: {all_patients}")
            return jsonify({'error': "Patient non trouvé"}), 404

        patient['_id'] = str(patient['_id'])  
        print(f"✅ Patient found: {patient.get('nom', 'N/A')} {patient.get('prenom', 'N/A')}")
        return jsonify(patient)
    except Exception as e:
        print(f"❌ Error in get_patient: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/patients/<IDPatient>', methods=['DELETE'])
def delete_patient(IDPatient):
    try:
        result = patients_collection.delete_one({'_id': ObjectId(IDPatient)})
        if result.deleted_count == 0:
            return jsonify({'error': "Patient non trouvé"}), 404
        return jsonify({'msg': "Patient supprimé avec succès!"})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

from datetime import date
@app.route('/ajouter_fiche', methods=['POST'])
def ajouter_fiche():
    try:
        data = request.get_json()
        print(data)

        if 'date_debut' not in data:
            data['date_debut'] = date.today()

        fiche = FicheModel(**data)
        fiche_dict = fiche.model_dump()

        for field in ['date_debut', 'date_cloture']:
            if isinstance(fiche_dict.get(field), date):
                fiche_dict[field] = fiche_dict[field].isoformat()

        mongo.db.ficheTraitement.insert_one(fiche_dict)

        update_result = mongo.db.patients.update_one(
            {"IDPatient": fiche.IDPatient},  
            {"$push": {"fiches": fiche.idfich}}
        )

        if update_result.modified_count == 0:
            return jsonify({"warning": "Fiche ajoutée, mais patient non trouvé pour mise à jour."}), 201

        return jsonify({"message": "Fiche ajoutée et liée au patient avec succès"}), 201

    except ValidationError as ve:
        return jsonify({"validation_error": ve.errors()}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/rendezvous', methods=['POST'])
def create_rendezvous():
    data = request.json
    res = mongo.db.rendezvous.insert_one(data)
    return jsonify({"message": "Rendez-vous créé", "id": str(res.inserted_id)}), 201

@app.route('/consultations', methods=['POST'])
def create_consultation():
    data = request.json
    res = mongo.db.consultations.insert_one(data)
    return jsonify({"message": "Consultation créée", "id": str(res.inserted_id)}), 201


@app.route('/effets-signales', methods=['POST'])
def create_effet_signale():
    data = request.json
    res = mongo.db.effets_signales.insert_one(data)
    return jsonify({"message": "Effet signalé enregistré", "id": str(res.inserted_id)}), 201


@app.route('/sessions', methods=['POST'])
def create_session():
    try:
        data = request.json
        print(data)
        session = SessionModel(**data)
        print(data)

        # 1️⃣ Gérer le rendez-vous séparément (liste de dates)
        rendezVous_list = []
        if session.rendezVous:
           for date in session.rendezVous:
               rdv_result = mongo.db.rendezvous.insert_one({"date": date})
               rendezVous_list.append({
                "_id": str(rdv_result.inserted_id),
                "date": date  # garde la date ici
        })

        # 2️⃣ Gérer les consultations + effets signalés
        consultation_ids = []
        for consultation in session.consultationsControle:
            effets_ids = []

            for effet in consultation.effetsSignales or []:
                effet_doc = effet.model_dump()
                effet_insert = mongo.db.effets_signales.insert_one(effet_doc)
                effets_ids.append(str(effet_insert.inserted_id))

            consultation_doc = {
                "dateVisite": consultation.dateVisite.isoformat(),
                "effetsSignales": effets_ids
            }
            consult_insert = mongo.db.consultations.insert_one(consultation_doc)
            consultation_ids.append(str(consult_insert.inserted_id))

        # 3️⃣ Construire le document final de session
        session_dict = session.model_dump()
        session_dict["dateDebut"] = session.dateDebut.isoformat()
        session_dict["dateFin"] = session.dateFin.isoformat() if session.dateFin else None
        session_dict["consultationsControle"] = consultation_ids
        # session_dict["rendezVous"] = rendezVous_ids
        session_dict["rendezVous"] = rendezVous_list

        # 4️⃣ Insérer la session
        res = mongo.db.sessions.insert_one(session_dict)

        return jsonify({
            "message": "Session enregistrée",
            "session_id": str(res.inserted_id)
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/sessions/<string:session_id>/cloturer', methods=['PUT'])
def cloturer_session(session_id):
    try:
        result = mongo.db.sessions.update_one(
            {"_id": ObjectId(session_id)},
            {"$set": {"statut": False}}
        )

        if result.matched_count == 0:
            return jsonify({"error": "Session non trouvée"}), 404
            #sinon 
        return jsonify({"message": "Session clôturée avec succès."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    
@app.route("/sessions/fiche/<string:idfich>", methods=["GET"])
def get_sessions_by_fiche(idfich):
    try:
        print(f"🔍 Searching for sessions with idfich: {idfich}")
        sessions = list(mongo.db.sessions.find({"idfich": idfich}))
        print(f"📊 Found {len(sessions)} sessions")
        for s in sessions:
            print(f"   Session: {s['_id']} - Status: {s.get('statut', 'N/A')}")
            s["_id"] = str(s["_id"])  # Convertir ObjectId pour JSON
        return jsonify(sessions), 200
    except Exception as e:
        print(f"❌ Error in get_sessions_by_fiche: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/patients/<IDPatient>/fiches', methods=['GET'])
def get_fiches_by_patient(IDPatient):
    try:
        fiches = list(ficheTraitement.find({"IDPatient": IDPatient}))
        for fiche in fiches:
            fiche['_id'] = str(fiche['_id'])  # convertir ObjectId
        return jsonify(fiches)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/fiches/<idfich>', methods=['GET'])
def get_fiche(idfich):
    try:
        print(f"🔍 Looking for fiche with idfich: {idfich}")
        fiche = ficheTraitement.find_one({'idfich': idfich})
        if not fiche:
            print(f"❌ Fiche not found with idfich: {idfich}")
            return jsonify({'error': "Fiche non trouvée"}), 404

        print(f"✅ Fiche found: {fiche.get('idfich', 'N/A')}")
        print(f"📋 Fiche IDPatient: {fiche.get('IDPatient', 'N/A')}")
        
        fiche['_id'] = str(fiche['_id'])
        return jsonify(fiche)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/modifierfiches/<idfich>', methods=['PUT'])
def modifier_fiche(idfich):
    try:
        fiche=mongo.db.ficheTraitement.find_one({"idfich": idfich})
        if not fiche:
            return jsonify({"error": "Fiche non trouvée"}), 404
        if 'date_cloture' in fiche:
            date_cloture = date.fromisoformat(fiche['date_cloture'])#fiche['date_cloture'] est une chaîne de caractères (string) venant de la base de données. Exemple : "2025-04-30"
#Mais pour comparer des dates, on a besoin d’un objet date de Python. Sinon, tu compares du texte, ce qui n’est pas fiable pour les dates.

            fiche['date_cloture'] = date.today()
            if date_cloture <= date.today():
                return jsonify({"message": "Cette fiche est figée et ne peut plus être modifiée."}), 403

        data = request.get_json()
        mongo.db.ficheTraitement.update_one({"idfich": idfich}, {"$set": data})
        return jsonify({"message": "Fiche modifiée avec succès"})
    except Exception as   e:   
              return jsonify({"error": str(e)}), 500



@app.route("/patients/<patient_id>/ficheTraitement/<fiche_id>/session", methods=["POST"]) 
def enregistrer_session(patient_id, fiche_id):
    data = request.get_json()

    if not data:
        return jsonify({"message": "Aucune donnée reçue"}), 400
    try:
        Session = SessionModel(**data)
    except ValidationError as e:
        return jsonify({"message": "Erreur de validation", "erreurs": e.errors()}), 400

    # creation d'un objt pour MongoDB

    session_data = Session.model_dump()
    session_data["IDFiche"] = fiche_id  #c 2 ids sont pas du json envoye par le front c pour ca on fait ca
    session_data["IDPatient"] = patient_id

    result = session.insert_one(session_data)
    session_id = result.inserted_id  #recuperation de l'id pour la suite

    
    ficheTraitement.update_one(
        {"IDFiche": fiche_id, "IDPatient": patient_id},
        {"$push": {"sessions_ids": session_id}}  # stocke les ids des sessions dans l'attribut sessions_id dans la fiche
    )
    #sessions.find({"_id": {"$in": fiche["sessions_ids"]}}) si on veut recuperer toutes les sessions d'une fiche


    return jsonify({"message": "Session enregistrée avec succès"}), 201

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
    
    # Créer un médecin par défaut (à supprimer apres)
    try:
        if not medecins_collection.find_one({"nom": "Toumi"}):
            medecins_collection.insert_one({
                "nom": "Toumi",
                "mot_de_passe": generate_password_hash("motDePasse123")
            })
            print("👨‍⚕️ Médecin par défaut créé")
        else:
            print("👨‍⚕️ Médecin par défaut déjà existant")
    except Exception as e:
        print(f"⚠️  Warning: Could not create/check default doctor: {e}")
    
    print("=" * 50)
    print("🌐 Server is starting on http://localhost:5000")
    print("📚 Swagger API documentation available at: http://localhost:5000/swagger")
    print("🐛 Debug mode: ON")
    print("=" * 50)
    
    app.run(debug=True)