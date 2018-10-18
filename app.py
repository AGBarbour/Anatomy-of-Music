import os

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///music.db"

db = SQLAlchemy(app)


class Features(db.Model):
    __tablename__ = 'features'

    id = db.Column(db.String(64), primary_key=True)
    popularity = db.Column(db.Float)
    danceability = db.Column(db.Float)
    energy = db.Column(db.Float)
    loudness = db.Column(db.Float)
    speechiness = db.Column(db.Float)
    duration_ms = db.Column(db.Float)
    tempo = db.Column(db.Float)

    def __repr__(self):
        return '<Features %r>' % (self.name)


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")
    # return "hi"

@app.route("/features")
def features():
    """Return all features"""
    # stmt = db.session.query(Features).statement
    # df = pd.read_sql_query(stmt, db.session.bind)

    results = db.session.query(Features.id, Features.popularity, Features.danceability, Features.energy, Features.loudness, Features.speechiness, Features.duration_ms, Features.tempo).all()

    song_id = [result[0] for result in results]
    popularity = [result[1] for result in results]
    danceability = [result[2] for result in results]
    energy = [result[3] for result in results]
    loudness = [result[4] for result in results]
    speechiness = [result[5] for result in results]
    duration_ms = [result[6] for result in results]
    tempo = [result[7] for result in results]
    

    # Format the data to send as json
    data = [{
        "song_id": song_id,
        "popularity": popularity,
        "danceability": danceability,
        "energy": energy,
        "loudness": loudness,
        "speechiness": speechiness,
        "duration_ms": duration_ms,
        "tempo": tempo
    }]
    return jsonify(data)

# @app.route("/features")
# def names():
#     """Return a features"""

#     # Use Pandas to perform the sql query
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Return a list of the column names (sample names)
#     return jsonify(list(df.columns)[2:])


# @app.route("/metadata/<sample>")
# def sample_metadata(sample):
#     """Return the MetaData for a given sample."""
#     sel = [
#         Samples_Metadata.sample,
#         Samples_Metadata.ETHNICITY,
#         Samples_Metadata.GENDER,
#         Samples_Metadata.AGE,
#         Samples_Metadata.LOCATION,
#         Samples_Metadata.BBTYPE,
#         Samples_Metadata.WFREQ,
#     ]

#     results = db.session.query(*sel).filter(Samples_Metadata.sample == sample).all()

#     # Create a dictionary entry for each row of metadata information
#     sample_metadata = {}
#     for result in results:
#         sample_metadata["sample"] = result[0]
#         sample_metadata["ETHNICITY"] = result[1]
#         sample_metadata["GENDER"] = result[2]
#         sample_metadata["AGE"] = result[3]
#         sample_metadata["LOCATION"] = result[4]
#         sample_metadata["BBTYPE"] = result[5]
#         sample_metadata["WFREQ"] = result[6]

#     print(sample_metadata)
#     return jsonify(sample_metadata)





if __name__ == "__main__":
    app.run()
