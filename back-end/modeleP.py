from typing import List, Optional
from pydantic import BaseModel,EmailStr 
from datetime import datetime

class AdresseListe(BaseModel):
     Rue: Optional[str]
     Wilaya: Optional[str]
     Commune: Optional[str]

class Antecedent(BaseModel):
     id: str
     description: Optional[str]

class PatientModel(BaseModel):
    IDPatient: str
    nom: str
    prenom: str
    #r"^[a-zA-ZéèêàçîïùâôÉÈÊÀÇÎÏÙÂÔ' -]+$"
    email: EmailStr
    age:int
    
    numero: str
    sexe: Optional[str]
    DateNaissance: datetime
#     poidsInitial: float
#     categorie: Optional[int]
#     preuve: Optional[str]
#     adresse: List[AdresseListe]
#     LocalisationTB: str
#     typeTuberculose: Optional[str]
#     comptage_tuberculeux: Optional[str]
#     antecedents: List[int]
#     note: Optional[str]
    
    class Config:
        validate_assignment = True



# class FicheModel(BaseModel):
#     IDPatient: str  
#     date_debut: datetime 
#     date_cloture: datetime
#     statut: Optional[str]