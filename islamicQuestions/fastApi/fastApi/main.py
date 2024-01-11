import numpy as np
import stanza
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.models import load_model

from fastapi import FastAPI
from strawberry.asgi import GraphQL
import strawberry
from fastapi.middleware.cors import CORSMiddleware
from typing import List

# Download the Arabic model for Stanza
stanza.download('ar')

# Initialize the Arabic pipeline
nlp = stanza.Pipeline('ar')
tokenizer = Tokenizer(filters="""'!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~\t\n`÷×؛<>_()*&^%][ـ،/:"؟.,'{}~¦+|!”…“–ـ""""")

def predict(input_ans):
    """Predicts a label for the given input answer using a pre-trained model."""

    model_path = "RNN_model.h5"  # Update with the correct path
    model = load_model(model_path)

    input_ans_vector = preprocess_input(input_ans)
    sequences = tokenizer.texts_to_sequences([input_ans_vector])[0]
    sequences = pad_sequences([sequences], maxlen=24)
    prediction = model.predict([sequences])  # Access the actual prediction
    prediction = np.argmax(prediction, axis=1)[0]
    return prediction

def preprocess_input(text):
    """Preprocesses text for prediction and generates a text vector."""

    doc = nlp(text)
    tokens = [
        word.lemma
        for sent in doc.sentences
        for word in sent.words
        if word.upos != "PUNCT"
    ]
    return tokens

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@strawberry.type
class Question:
    id: int
    answer: str
    score: int
    
questions: List[Question] = []

@strawberry.type
class Query:
    @strawberry.field
    def questions(self) -> List[Question]:
        return questions
    
@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_question(self, id: str, answer: str) -> List[Question]: 
        score=predict(answer)
        questions.append(Question(id=id, answer=answer, score=score))
        return questions
schema = strawberry.Schema(query=Query, mutation=Mutation)

graphql_app = GraphQL(schema)
app.add_route("/graphql", graphql_app)
app.add_websocket_route("/graphql", graphql_app)
