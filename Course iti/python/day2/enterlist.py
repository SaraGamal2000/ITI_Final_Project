
def enter_list():
    list_names = input("Enter your list of names: ")
    print(list_names)
    list = []
    count = 0
    d = {} 
    
    for index, char in enumerate(list_names):
        if char == "[" or char == ",":
            continue
        elif char == "'":
            count += 1
            if count % 2 != 0:  
                if index + 1 < len(list_names): 
                    key = list_names[index + 1]
                    d[key] = []  
                    #print('key',key)
            else:
                #print('d : ',d)
                #print('list',list)
                d[key] = ''.join(list)
                #print('d[key]',d[key])
                list = []  
        else:
            if count % 2 != 0:
                list.append(char)
                #print('lis',list)

    print("Final dictionary:", d)

enter_list()