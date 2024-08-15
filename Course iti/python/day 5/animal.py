

class animal:
    def __init__(self,name,type):
        self.name=name
        self.type=type
    def eat(self):
          print(f"animal of {self.name} the {self.type} is eating.")
    
    def drink(self):
          print(f"{self.name} the {self.type} is dirinking.")
    
class cat(animal):
    def __init__(self, name,type, color):
        super().__init__(name,type)
        self.color=color
    def meow(self,voice):
        print(f'the meow of this cat is {voice}')
    def eat(self):
        print(f"{self.name} the {self.color} is eating.")
        
        
