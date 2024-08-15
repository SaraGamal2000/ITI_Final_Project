
class Bank:
    
    def __init__(self ,name,objCustomers=None):
        self.name=name
        self.objCustomers = objCustomers if objCustomers is not None else []

    
        
    def display_all_customers(self):
        return self.objCustomers.customers_name
   
   
   
        
class Account:
    def __init__(self,Acc_id,balance=0):
        self.Acc_id=Acc_id
        self.balance=balance
        
    def earning(self,amount):
        self.balance+=amount
        
    def get_balance(self):
        return self.balance
    
    def take_from_balance(self,amount):
        if self.get_balance()>=amount:
            self.balance-=amount
        
     
    
class Customer:
    def __init__(self,customers_name,customers_id,objAcc=None):
        self.customers_name=customers_name
        self.customers_id=customers_id
        self.objAcc = objAcc if objAcc is not None else []
        

    def transfer(self,objecAcc1,objecAcc2,amount):
         if objecAcc1.get_balance() >= amount:
            objecAcc1.take_from_balance(amount)
            objecAcc2.earning(amount)


 
