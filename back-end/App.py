from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS
from bson.objectid import ObjectId

app = Flask(__name__)

# Configuration MongoDB
app.config["MONGO_URI"] = "mongodb+srv://aminarz910:Z9xxYhe5FtmypXur@cluster0.ffgi2.mongodb.net/My_db?retryWrites=true&w=majority"
#"mongodb+srv://amina:fAQDc0vBrK7CTmlP@cluster0.ffgi2.mongodb.net/TB-Tracker?retryWrites=true&w=majority" 
mongo = PyMongo(app)

# Activer CORS
CORS(app)
db = mongo.db.patients #accéder à la collection patients dans la base de données

# Configuration de Swagger
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'  # Le fichier Swagger JSON
swaggerui_blueprint = get_swaggerui_blueprint(SWAGGER_URL, API_URL, config={'app_name': "TB Tracker API"})
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

# Ajouter un patient
@app.route('/patients', methods=['POST'])
def add_patients():
    try:
        result = db.insert_one({
            "nom": request.json['nom'],
            "prenom": request.json['prenom'],
            "ddn": request.json['ddn'],
            "poids": request.json['poids'],
            "age": request.json['age'],
            "gender": request.json['gender'],
            "tlphn": request.json['tlphn'],
            "email": request.json['email'],
            "adresse": request.json['adresse'],
            "situationTB": request.json['situationTB'],
            "autreMaladie": request.json['autreMaladie'],
            "allergies": request.json['allergies']
        })
        return jsonify({'id': str(result.inserted_id), 'msg': "Patient ajouté avec succès!"})
                               #contient l'id du patient ajouté
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/patients', methods=['GET'])
def get_patients():
    patients = []
    for doc in db.find():
        patients.append({
            'id': str(doc['_id']),
            'nom': doc['nom'],
            'prenom': doc['prenom'],
            'ddn': doc['ddn'],
            'poids': doc['poids'],
            'age': doc['age'],
            'gender': doc['gender'],
            'tlphn': doc['tlphn'],
            'email': doc['email'],
            'adresse': doc['adresse'],
            'situationTB': doc['situationTB'],
            'autreMaladie': doc['autreMaladie'],
            'allergies': doc['allergies']
        })
    return jsonify(patients)

@app.route('/patients/<id>', methods=['GET'])
def get_patient(id):
    try:
        patient = db.find_one({'_id': ObjectId(id)})
        if not patient:
            return jsonify({'error': "Patient non trouvé"}), 404
        return jsonify({**patient, '_id': str(patient['_id'])})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/patients/<id>', methods=['DELETE'])
def delete_patient(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg': "Patient supprimé avec succès!"})

@app.route('/patients/<id>', methods=['PUT'])
def update_patient(id):
    db.update_one({'_id': ObjectId(id)}, {'$set': request.json})
    return jsonify({'msg': "Patient modifié avec succès!"})

if __name__ == '__main__':
    app.run(debug=True)
