#!/usr/bin/env python
# coding: utf-8

from roboflow import Roboflow
rf = Roboflow(api_key="qeGp3jHEN1oDwFOzL5Qo")
project = rf.workspace().project("tree-detection-dexlw")
model = project.version(1).model

# infer on a local image
data = model.predict(r"D:\GITHUB-DEPLOYS\GreenMapper_BE_Project\image\final\finall.png", confidence=3, overlap=30).json()

# visualize your prediction
model.predict(r"D:\GITHUB-DEPLOYS\GreenMapper_BE_Project\image\final\finall.png", confidence=3, overlap=30).save("prediction.jpg")

# infer on an image hosted elsewhere


# In[6]:


num_detected_objects = len(data["predictions"])
num_detected_objects