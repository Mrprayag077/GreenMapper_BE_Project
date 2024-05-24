#!/usr/bin/env python
# coding: utf-8

# In[4]:


from roboflow import Roboflow
rf = Roboflow(api_key="qeGp3jHEN1oDwFOzL5Qo")
project = rf.workspace().project("tree-detection-dexlw")
model = project.version(1).model

# infer on a local image
# data=model.predict(r"C:\Users\Dell\Downloads\photo_6118237349478516034_x.jpg", confidence=3, overlap=30).json()
data=model.predict(r"D:\GITHUB-DEPLOYS\GreenMapper_BE_Project\image\final\finall.png", confidence=3, overlap=30).json()

 #visualize your prediction
# model.predict(r"C:\Users\Dell\Downloads\photo_6118237349478516034_x.jpg", confidence=3, overlap=30).save("prediction.jpg")
model.predict(r"D:\GITHUB-DEPLOYS\GreenMapper_BE_Project\image\final\finall-predict.png", confidence=3, overlap=30).save("prediction.jpg")

# infer on an image hosted elsewhere


# In[6]:


num_detected_objects = len(data["predictions"])
num_detected_objects


# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[1]:


#from roboflow import Roboflow
#rf = Roboflow(api_key="qeGp3jHEN1oDwFOzL5Qo")
#project = rf.workspace().project("tree-detection-dexlw")
#model = project.version(2).model

# infer on a local image
#print(model.predict(r"C:\Users\Dell\Downloads\photo_6118237349478516034_x.jpg", confidence=1, overlap=30).json())

# visualize your prediction
#model.predict(r"C:\Users\Dell\Downloads\TREE_PROJ\output\img3.png", confidence=1, overlap=30).save("prediction.jpg")

# infer on an image hosted elsewhere
# print(model.predict("URL_OF_YOUR_IMAGE", hosted=True, confidence=40, overlap=30).json())


# In[3]:


# num_detected_objects = len(model["predictions"])
# num_detected_objects


# In[ ]:




