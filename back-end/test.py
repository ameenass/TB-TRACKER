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