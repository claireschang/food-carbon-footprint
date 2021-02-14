from flask import (
    Flask, flash, redirect, render_template, request, url_for, session, jsonify
)
from flask_cors import CORS
from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import service_pb2_grpc

stub = service_pb2_grpc.V2Stub(ClarifaiChannel.get_grpc_channel())

from clarifai_grpc.grpc.api import service_pb2, resources_pb2
from clarifai_grpc.grpc.api.status import status_code_pb2

import food

app = Flask(__name__)
CORS(app)

@app.route('/')
def my_form():
    return render_template('index.html')


# @app.route('/ingredients', methods=['GET', 'POST'])
# def findIngredients():
#     # This is how you authenticate.
#     metadata = (('authorization', 'Key ca6dff40c60c49f69cdafd0a3ea2b5e5'),)

#     req = service_pb2.PostModelOutputsRequest(
#         # This is the model ID of a publicly available General model. You may use any other public or custom model ID.
#         # public id: aaa03c23b3724a16a56b629203edc62c
#         model_id='bd367be194cf45149e75f01d59f77ba7',
#         inputs=[
#             # good mochi: https://cdn.theculturetrip.com/wp-content/uploads/2018/02/shutterstock_358538228.jpg
#             resources_pb2.Input(data=resources_pb2.Data(image=resources_pb2.Image(url=request.form['query_url'])))
#         ])
#     response = stub.PostModelOutputs(req, metadata=metadata)

#     if response.status.code != status_code_pb2.SUCCESS:
#         raise Exception("Request failed, status code: " + str(response.status.code))

#     foods = []
#     carbons = []
#     maxCarbon = 0
#     for concept in response.outputs[0].data.concepts:
#         # print('%12s: %.2f' % (concept.name, concept.value))
#         if concept.value > 0.70:
#             carbon = ""
#             if concept.name in food.food_to_carbon:
#                 carbon = food.food_to_carbon[concept.name]
#                 if carbon > maxCarbon:
#                     maxCarbon = carbon
#                 carbons.append((concept.name, str(carbon)))
#             else:
#                 foods.append(concept.name)
#     equiv = ghgequivalence(maxCarbon)
#     # print(foods)
#     # if 'nut' in foods:
#     #     print("Allergy alert!")
#     return jsonify({"foods": foods, "carbons": carbons, "img": '', "equiv": equiv})
    # return render_template("index.html", foods=foods, carbons=carbons, img=request.form['query_url'], equiv=equiv)

@app.route('/ingredients')
def findIngredients():
    # This is how you authenticate.
    metadata = (('authorization', 'Key ca6dff40c60c49f69cdafd0a3ea2b5e5'),)

    req = service_pb2.PostModelOutputsRequest(
        # This is the model ID of a publicly available General model. You may use any other public or custom model ID.
        # public id: aaa03c23b3724a16a56b629203edc62c
        model_id='bd367be194cf45149e75f01d59f77ba7',
        inputs=[
            # good mochi: https://cdn.theculturetrip.com/wp-content/uploads/2018/02/shutterstock_358538228.jpg
            resources_pb2.Input(data=resources_pb2.Data(image=resources_pb2.Image(url=request.args.get('query_url'))))
        ])
    response = stub.PostModelOutputs(req, metadata=metadata)

    if response.status.code != status_code_pb2.SUCCESS:
        raise Exception("Request failed, status code: " + str(response.status.code))

    foods = []
    carbons = []
    maxCarbon = 0
    for concept in response.outputs[0].data.concepts:
        # print('%12s: %.2f' % (concept.name, concept.value))
        if concept.value > 0.70:
            carbon = ""
            if concept.name in food.food_to_carbon:
                carbon = food.food_to_carbon[concept.name]
                if carbon > maxCarbon:
                    maxCarbon = carbon
                carbons.append((concept.name, str(carbon)))
            else:
                foods.append(concept.name)
    equiv = ghgequivalence(maxCarbon)
    # print(foods)
    # if 'nut' in foods:
    #     print("Allergy alert!")
    return jsonify({"foods": foods, "carbons": carbons, "img": request.args.get('query_url'), "equiv": equiv})

def ghgequivalence(lbs):
    # every 1000 lbs of CO2 is equivalent to
    mi = 1126 * lbs / 1000 # GHG from __ miles driven by an average passenger vehicle
    gas = 51 * lbs / 1000 # CO2 emissions from __ gallons of gasoline consumed
    coal = 500 * lbs / 1000  # CO2 emissions from __ pounds of coal burned
    phone = 57848 * lbs / 1000  # CO2 emissions from __ phones charged
    trees = 7.5 * lbs / 1000  # carbon sequestered by __ tree seedlings grown for 10 years
    return {
        "mi": format(mi, '.2f'), 
        "gas": format(gas, '.2f'), 
        "coal": format(coal, '.2f'), 
        "phone": format(phone, '.2f'), 
        "trees": format(trees, '.2f')
    }
    



if __name__=='__main__': 
   app.run()