def produce(month,width,beg_col):
    res=[]
    col=beg_col
    day=1
    while month>0:
        row=[0]*width
        marked=False
        for i in range(width):
            if i>=beg_col and month>0:
                row[i]=day
                day+=1
                month-=1
            elif not marked:
                col=i
                marked=True
        beg_col=0
        res.append(row)
    return res,col

mat,col=produce(31,28,0)
mat1,col1=produce(28,28,col+1)
mat2,col2=produce(28,28,col1+1)
print(f"Last col is {col1}")
for row in mat:
    print(row)
print("----------------------------------------")
for row in mat1:
    print(row)
    
print("----------------------------------------")
for row in mat2:
    print(row)
    