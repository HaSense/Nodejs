import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

plt.figure
plt.plot([1,2,3,4,5,6,7,8,9,10])
plt.xlabel('X - values')
plt.ylabel('Y - values')
plt.savefig('./public/img/image.png',
            facecolor='#eeeeee',
            edgecolor='black',
            format='png',
            bbox_inches='tight',
            dpi=300)
#plt.show()