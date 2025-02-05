from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS

app = Flask(__name__)

# Configuration MongoDB
app.config["MONGO_URI"] = "mongodb+srv://aminarz910:Z9xxYhe5FtmypXur@cluster0.ffgi2.mongodb.net/My_db?retryWrites=true&w=majority"
mongo = PyMongo(app)

# Activer CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# Swagger UI Configuration
SWAGGER_URL = '/swagger'  # URL pour accéder à Swagger UI
API_URL = '/static/swagger.json'  # Localisation du fichier Swagger JSON

swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Patient Manager App"
    }
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

# Routes API
@app.route('/')
def home():
    return "Bienvenue sur la page d'accueil !"
#return jsonify({"message": "Bienvenue sur la page d'accueil !",data})

# Ajouter un patient
@app.route('/add_patients', methods=['POST'])
def add_patients():
    try:
        data = request.get_json()
        if not all(key in data for key in ('name', 'age', 'gender', 'date_of_birth', 'weight')):
            return jsonify({"message": "Données manquantes"}), 400

        patient = {
            "name": data['name'],
            "age": int(data['age']),
            "gender": data['gender'],
            "date_of_birth": data['date_of_birth'],
            "weight": float(data['weight']),
        }
        result = mongo.db.patients.insert_one(patient)
        return jsonify({"message": "Patient ajouté avec succès!", "patient_id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"message": "Erreur lors de l'ajout du patient", "error": str(e)}), 500

# Récupérer tous les patients
@app.route('/get_patients', methods=['GET'])
def get_patients():
    return jsonify([{"name":"toto1","age":20},{"name":"toto2","age":21}])
    # try:
    #     patients = mongo.db.patients.find()
    #     patient_list = []
    #     for patient in patients:
    #         patient['_id'] = str(patient['_id'])
    #         patient_list.append(patient)
    #     return jsonify(patient_list), 200
    # except Exception as e:
    #     return jsonify({"message": "Erreur lors de la récupération des patients", "error": str(e)}), 500

# Rechercher un patient par nom
@app.route('/search_by_name', methods=['GET'])
def search_by_name():
    try:
        query = request.args.get('name')
        if not query:
            return jsonify({"message": "Le nom est requis pour la recherche"}), 400

        patients = mongo.db.patients.find({
            "name": {"$regex": f"^{query}", "$options": "i"}
        }).limit(10)
        patient_list = []
        for patient in patients:
            patient['_id'] = str(patient['_id'])
            patient_list.append(patient)
        return jsonify(patient_list), 200
    except Exception as e:
        return jsonify({"message": "Erreur lors de la recherche", "error": str(e)}), 500

if __name__ == '__main__':    #pour mettre le serveur a jour automatiquement
    app.run(debug=True) 