# from app import create_myapp
#
# if __name__ == "__main__":
#     app=create_myapp("prd")
#     app.run()
from app import create_app

if __name__=='__main__':
    print("---- creating app == ")
    app = create_app('prd')
    app.run(debug=True)