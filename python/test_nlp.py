import nltk
import json

from nltk.sentiment.vader import SentimentIntensityAnalyzer 

sid = SentimentIntensityAnalyzer()

def show_sentiments(documents):
    posCnt=0.0
    negCnt=0.0
    neuCnt=0.0
    jsonResponse='{'

    for sentence in documents:
        ss = sid.polarity_scores(sentence)
        for k in ss:
         if k == "neg":
            negCnt=negCnt+ss[k]
         if k == "pos":
            posCnt=posCnt+ss[k]
         if k == "neu":
            neuCnt=neuCnt+ss[k]
    jsonResponse={'Positive':str(posCnt),'Negative':str(negCnt),'Neutral':str(neuCnt)}

    return jsonResponse
