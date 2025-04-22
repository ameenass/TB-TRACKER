from typing import List, Optional
from pydantic import BaseModel,EmailStr

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
    email: EmailStr
    age:int
    
    numero: str
    sexe: Optional[str]
    DateNaissance: str
    poidsInitial: float
    categorie: Optional[int]
    preuve: Optional[str]
    adresse: List[AdresseListe]
    LocalisationTB: str
    typeTuberculose: Optional[str]
    comptage_tuberculeux: Optional[str]
    antecedents: List[Antecedent]
    
    note: Optional[str]
    
    class Config:
        validate_assignment = True
