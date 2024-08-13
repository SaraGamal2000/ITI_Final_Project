
class Human:
    def _init_(self,name,age):
        # Instance variables
        self.name = name
        self.age = age
        
    # Instance method
    def message(self):
        print('hellow',self.name)
        
    #class method
    @staticmethod
    def personweight(weight):
        if weight >=160:
            print('this person is "VeryFat"')
        elif weight >=100:
            print('this person is "Fat"')
        elif weight >=50:
            print('this person is "ideal"')
        else:
            print('this person is "Thin"')
        


class Employee:
    company_name = 'Betik'
    def __init__(self, id,name,salary):
        self.id = id
        self.name = name
        self.salary = salary
        
    def display_info(self):
        print(f'Employee: {self.id}')
        print(f'Age: {self.name}')
        print(f'Position: {self.salary}')
            
    def update_salary(self, new_salary):
        self.salary = new_salary
        print(f'Position updated to: {self.salary}')
        
    def change_company_name(cls, new_name):
        cls.company_name = new_name
        print(f'Company name changed to: {cls.company_name}')
        
