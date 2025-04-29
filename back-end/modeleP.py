from typing import  Optional , List
from pydantic import BaseModel,EmailStr 
from datetime import date
class AdresseListe(BaseModel):
     wilaya: Optional[str]
     commune: Optional[str]

class PatientModel(BaseModel):
    IDPatient: str
    nom: str
    prenom: str   #r"^[a-zA-ZéèêàçîïùâôÉÈÊÀÇÎÏÙÂÔ' -]+$"
    email: EmailStr
    age:int
    numero: str
    sexe: Optional[str]
    DateNaissance: date   
    poidsInitial: float 
    #   categorie: Optional[str] #     preuve: Optional[str]#    adresse: List[AdresseListe]#     LocalisationTB: str#     typeTuberculose: Optional[str]#     comptage_tuberculeux: Optional[str]#     antecedents: List[int]#     note: Optional[str]
    adresse : AdresseListe




class SessionModel(BaseModel):
    date_debut: str
    date_fin: str
    statut: str
    Observation: str
    IDMedicament: str
    IDRendezvous: str


# class Antecedents(BaseModel):
#     id: str
#     description: str

class FicheModel(BaseModel):
    idfich: str
    date_debut: date    
    date_cloture: date
    statut: str
    categorie: str
    LocalisationTB: str
    preuve: str
    selectedSousType : str
    Comptage_tuberculeux: bool
    antecedents: List[str]
    poidsInitial: float
    note : Optional[str]
    
    def est_modifiable(self) -> bool:
        """Retourne True si la fiche est encore modifiable"""
        return self.date_cloture > date.today()

    class Config:
        validate_assignment = True
       
