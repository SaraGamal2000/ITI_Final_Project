import psycopg2
import sys
host='localhost'
user='postgres'
password='123'
dbname='iti'

def connectdb():
    try:
       conn = psycopg2.connect(host=host, user=user,dbname=dbname,password=password)
       print(f'the connect succees with {dbname}')
       return conn
    except :
        print("check the connection",e)
        

def insert(id,name,age,track_id):
    connec=connectdb()
    query='INSERT INTO trainee (id, name, age, track_id) VALUES (%s, %s, %s, %s)'
    try:
        cur=connec.cursor()
        cur.execute(query,(id,name, age, track_id))
        connec.commit()
        print('insetion done')
    except Exception as e :
      print("check the error",e)
    
# insert(2,"esraa",20,3)         

def update(id,name,age,track_id):
    connec=connectdb()
    query='UPDATE trainee SET name = %s,age = %s, track_id = %s WHERE id = %s'
    try:
        cur=connec.cursor()
        cur.execute(query,(name,age,track_id,id))
        connec.commit()
        print('update done')
    except Exception as e :
      print("check the error",e)

# update(2,'ahmed',30,5)
def select():
    connec=connectdb()
    query=f'select * from trainee'
    try:
        cur=connec.cursor()
        cur.execute(query)
        traineedata=cur.fetchall()
        print(traineedata)
        return traineedata
    except:
        print('exception')
# select()

def drop_column(column_name):
    connec=connectdb()
    query=f'ALTER TABLE trainee DROP COLUMN {column_name}'
    try:
        cur=connec.cursor()
        cur.execute(query)
        print('the drop done')
        connec.commit() 
       
    except Exception as e:
        print('faild to drop',e)
# drop_column('track_id')