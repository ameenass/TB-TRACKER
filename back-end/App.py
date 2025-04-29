from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS
from bson.objectid import ObjectId
from modeleP import PatientModel , SessionModel , FicheModel
from pydantic import ValidationError
from datetime import date
import secrets
import string

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/tb_tracker"
mongo = PyMongo(app)
CORS(app)
session = mongo.db.session

ficheTraitement = mongo.db.ficheTraitement  

db = mongo.db.patients
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json' 
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL, API_URL, config={'app_name': "TB Tracker API"}
    )
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

@app.route('/')
def home():
    return 'Bienvenue sur la page de TB Tracker!'


# @app.route("/adresses", methods=["GET"])
# def get_adresses():     #juste pour tester 
#     return jsonify(["Paris", "Lyon", "Marseille"])


@app.route('/patients', methods=['POST'])
def add_patient():
    try:
        try:
            data = request.get_json()
            alphabet = string.ascii_letters + string.digits
            mdp_genere = ''.join(secrets.choice(alphabet) for _ in range(6)) # secrets--> aleatoire sécurisé et il y a random pas sécurisé
            data['IDPatient'] = mdp_genere

            patient = PatientModel(**data)
        except ValidationError as e:
            return jsonify({'error': e.errors()}), 400  # bad request

        if db.find_one({"email": patient.email}):
            return jsonify({'error': "Un patient avec cet email existe déjà"}), 409

        patient_dict = patient.model_dump()

        if isinstance(patient_dict.get('DateNaissance'), date):
            patient_dict['DateNaissance'] = patient_dict['DateNaissance'].isoformat()

        result = db.insert_one(patient_dict)
        return jsonify({
            'id': str(result.inserted_id),
            'msg': "Patient ajouté avec succès!",
            'IDPatient': mdp_genere 
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500  # erreur du serveur
@app.route('/patients', methods=['GET'])
def get_patients():
    try:
        patients = []
        for doc in db.find():
            doc['_id'] = str(doc['_id'])  
            patients.append(doc)
        return jsonify(patients)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# @app.route('/patients/<IDPatient>', methods=['GET'])
# def get_patient(IDPatient):
#     try:
#         patient = db.find_one({'_id': ObjectId(IDPatient)})
#         if not patient:
#             return jsonify({'error': "Patient non trouvé"}), 404
#         patient['_id'] = str(patient['_id'])  
#         return jsonify(patient)
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

@app.route('/patients/<IDPatient>', methods=['GET'])
def get_patient(IDPatient):
    try:
        # Recherche par champ personnalisé "IDPatient", pas par ObjectId
        patient = db.find_one({'IDPatient': IDPatient})
        if not patient:
            return jsonify({'error': "Patient non trouvé"}), 404

        patient['_id'] = str(patient['_id'])  # Optionnel si tu veux garder l'ObjectId en string
        return jsonify(patient)
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/patients/<IDPatient>', methods=['DELETE'])
def delete_patient(IDPatient):   # le parametre qu'on a passé dans l'url, c pour faciliter l'acces à  un tel patient on peut aussi ajouter exmpl /medicament pour lui dire d'ajouter un tel medic a un tel patient dans l'api route
    try:
        result = db.delete_one({'_id': ObjectId(IDPatient)})
        if result.deleted_count == 0:
            return jsonify({'error': "Patient non trouvé"}), 404
        return jsonify({'msg': "Patient supprimé avec succès!"})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# @app.route('/patients/<IDPatient>', methods=['PUT'])
# def update_patient(IDPatient):
#     try:
#         data = request.json
#         if not data:
#             return jsonify({'error': "Aucune donnée fournie"}), 400

#         result = db.update_one({'_id': ObjectId(IDPatient)}, {'$set': data})
#         if result.matched_count == 0:
#             return jsonify({'error': "Patient non trouvé"}), 404
#         return jsonify({'msg': "Patient modifié avec succès!"})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500


from datetime import date

@app.route('/ajouter_fiche', methods=['POST'])
def ajouter_fiche():
    try:
        data = request.get_json()
        print(data)
        fiche = FicheModel(**data)
        print(fiche)
        
        # model dump au lieu de .dict --> serine adi lik
        fiche_dict = fiche.model_dump()

        #format ISO desdates
        for field in ['date_debut', 'date_cloture']:
            if isinstance(fiche_dict.get(field), date):
                fiche_dict[field] = fiche_dict[field].isoformat()

        mongo.db.ficheTraitement.insert_one(fiche_dict)

        return jsonify({"message": "Fiche ajoutée avec succès"}), 201

    except ValidationError as ve:
        return jsonify({"validation_error": ve.errors()}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

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
@app.route('/fiches', methods=['GET'])
def get_all_fiches():
    ficheTraitement = list(mongo.db.ficheTraitement.find({}, {'_id': 0}))
    return jsonify(ficheTraitement)

@app.route('/fiche/<idfich>', methods=['GET'])
def get_one_fiche(idfich):
    fiche = mongo.db.ficheTraitement.find_one({"idfich": idfich}, {'_id': 0})
    if fiche:
        return jsonify(fiche)
    else:
        return jsonify({"error": "Fiche non trouvée"}), 404


# @app.route('/fiche', methods =['POST'])
# def creaction_fiche():
# try:
#         Data = request.get_json()
#         fiche = FicheModel(**Data)
#     except ValidationError as e:
#             return jsonify({'error': e.errors()}) , 

#      ficheDict = fiche.dict()
#      fiche_collection = db["ficheTraitement"]
#      Result = fiche_collection.insert_one(ficheDict)
#      fiche_dict["_id"] = str(Result.inserted_id)
#      return jsonify(ficheDict) , 201


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

    session_data = Session.dict()
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
    app.run(debug= True)