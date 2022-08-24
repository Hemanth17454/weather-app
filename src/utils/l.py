m=int(input())
n=int(input())
grid=[]
for i in range(m):
    grid.append(list(map(int,input().split())))

class Graph:
    def __init__(self, m,n,grid):
        self.m = m
        self.n=n
        self.adj=grid
    def isSafe(self,i,j,m,n):
        if i==-1 or j==-1 or i==m or j==n :
            return False
        return True
    def DFSUtil(self, temp, i,j ):
        temp.append(1)
        dx=[1,-1,0,0,1,-1,1,-1]
        dy=[0,0,1,-1,-1,1,-1,1]
        for k in range(8):
            x=i+dx[k]
            y=j+dy[k]
            if self.isSafe(x,y,m,n) and self.adj[x][y] == 1:
                self.adj[x][y]=0
                temp = self.DFSUtil(temp, x,y,)
        return temp
    def connectedComponents(self):
        cc = []
        for i in range(m):
            for j in range(n):
                if self.adj[i][j] ==1 :
                    temp = []
                    self.adj[i][j]=0
                    cc.append(len(self.DFSUtil(temp, i,j)))
        return cc
g=Graph(m, n, grid)
l=g.connectedComponents()
l.sort()
l=l[::-1]
suresh=0
ramesh=0
for i in range(len(l)):
    if i%2==0:
        suresh+=l[i]
    else:
        ramesh+=l[i]
print(suresh)

