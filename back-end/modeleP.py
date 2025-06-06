from typing import  Optional , List 
from pydantic import BaseModel,EmailStr , Field
from datetime import date , datetime 
 
class AdresseListe(BaseModel):
     wilaya: Optional[str]
     commune: Optional[str]

class PatientModel(BaseModel):
   # IDPatient: str
    nom: str
    prenom: str   #r"^[a-zA-ZéèêàçîïùâôÉÈÊÀÇÎÏÙÂÔ' -]+$"
    email: EmailStr
    
    numero: str
    sexe: Optional[str]
    DateNaissance: date   
    poidsInitial: float 
    #   categorie: Optional[str] #     preuve: Optional[str]#    adresse: List[AdresseListe]#     LocalisationTB: str#     typeTuberculose: Optional[str]#     comptage_tuberculeux: Optional[str]#     antecedents: List[int]#     note: Optional[str]
    adresse : AdresseListe
    mot_de_passe: str
    

class MedecinModel(BaseModel):
    nom: str 
    mot_de_passe: str 

class EffetSignaleModel(BaseModel):
    idEffetSignale: str
    nom: str
    nbJours: int
    dateDebut: Optional[datetime]
    dateDeSignalement: Optional[datetime  ]

class ConsultationControleModel(BaseModel):
    # dateVisite: datetime  
    effetsSignales: Optional[List[EffetSignaleModel]] = []

class NoteModel(BaseModel):
    text: str
    date: datetime  

class SuspensionModel(BaseModel):
    startDate: datetime
    endDate :datetime
    note : str
class SessionModel(BaseModel):
    idfich: str
    statut: bool
    dateDebut: datetime  
    dateFin: Optional[datetime  ]
    notes: Optional[List[NoteModel]] = []
    rendezVous: Optional[List[str]] = []  # ✅ maintenant c’est une liste de chaînes
    effetsSignales: Optional[List[EffetSignaleModel]] = []
    traitement: Optional[str]
    suspensions: Optional[List[SuspensionModel]] = []

# class Antecedents(BaseModel):
#     id: str
#     description: str

class FicheModel(BaseModel):
    idfich: str
    IDPatient: Optional[str]
    date_debut: Optional[date] = Field(default_factory=date.today)  # date statique par défaut
    statut: str
    categorie: str
    preuve: str
    selectedSousType : str
    Comptage_tuberculeux: bool
    antecedents: List[str]
    poidsInitial: float
    note : Optional[str]
    contraception : bool

    # def est_modifiable(self) -> bool:
    #     """Retourne True si la fiche est encore modifiable"""
    #     return self.date_cloture > date.today()


    class Config:
        validate_assignment = True
       
