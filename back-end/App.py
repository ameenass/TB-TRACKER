from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS
from bson.objectid import ObjectId
from modeleP import PatientModel
from pydantic import ValidationError


app = Flask(__name__)


app.config["MONGO_URI"] = "mongodb://localhost:27017/tb_tracker"
mongo = PyMongo(app)

CORS(app)
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


@app.route("/adresses", methods=["GET"])
def get_adresses():     #juste pour tester 
    return jsonify(["Paris", "Lyon", "Marseille"])


@app.route('/patients', methods=['POST'])
def add_patient():
    try:
        try:
            data = request.get_json()
            patient = PatientModel(**data)
        except ValidationError as e:
            return jsonify({'error': e.errors()}), 400  # bad request 

        
        if db.find_one({"email": patient.email}):
            return jsonify({'error': "Un patient avec cet email existe déjà"}), 409

        result = db.insert_one(patient.dict())
        return jsonify({'id': str(result.inserted_id), 'msg': "Patient ajouté avec succès!"}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500  # erreur du serveur
    

@app.route('/fiche', methods =['POST'])
def creaction_fiche():
    data = request.json

    IDPatient = data.get("IDPatient")
    date_debut = data.get("date_debut")  #juste string pour le moment,datetime.strptime
    date_cloture = data.get("date_cloture")
    statut = data.get("statut")

    fiche = {
    "IDPatient": ObjectId(IDPatient),
    "date_debut": date_debut,
    "date_cloture": date_cloture,
    "statut": statut
}
    fiche_collection = db["fiches"]
    result = fiche_collection.insert_one(fiche)
    fiche["_id"] = str(result.inserted_id)
    fiche["IDPatient"] = str(fiche["IDPatient"])

    return jsonify(fiche), 201

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

@app.route('/patients/<IDPatient>', methods=['GET'])
def get_patient(IDPatient):
    try:
        patient = db.find_one({'_id': ObjectId(IDPatient)})
        if not patient:
            return jsonify({'error': "Patient non trouvé"}), 404
        patient['_id'] = str(patient['_id'])  
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

if __name__ == '__main__':
    app.run(debug= True)