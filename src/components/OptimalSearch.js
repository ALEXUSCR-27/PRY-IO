import React, {useState} from "react";
import NavBar from "./NavBar";

function OptimalSearch() {

    const [keys, setKeys] = useState([1, 2, 3, 4]);
    const [probabilities, setProbabilities] = useState([0.18, 0.32, 0.39, 0.11]);

    const optimalBinarySearchTree = () => {
        var n = keys.length;
        var cost = new Array(n);
    for (var i = 0; i < n; i++)
        cost[i] = new Array(n);
  
    /* cost[i][j] = Optimal cost of binary search tree
    that can be formed from keys[i] to keys[j].
    cost[0][n-1] will store the resultant cost */
  
    // For a single key, cost is equal to frequency of the key
    for (var i = 0; i < n; i++)
        cost[i][i] = probabilities[i];
  
    // Now we need to consider chains of length 2, 3, ... .
    // L is chain length.
    for (var L = 2; L <= n; L++)
    {
        // i is row number in cost[][]
        for (var i = 0; i <= n-L+1; i++)
        {
            // Get column number j from row number i and
            // chain length L
            var j = i+L-1;
            var off_set_sum = sum(probabilities, i, j);
            if ( i >= n || j >= n)
                break
            cost[i][j] = Number. MAX_SAFE_INTEGER;
  
            // Try making all keys in interval keys[i..j] as root
            for (var r = i; r <= j; r++)
            {
            // c = cost when keys[r] becomes root of this subtree
            var c = 0;
            if (r > i)
                c += cost[i][r-1]
            if (r < j)
                c += cost[r+1][j]
            c += off_set_sum;
            if (c < cost[i][j])
                cost[i][j] = c;
            }
        }
    }
    return cost[0][n-1];
}
  
// A utility function to get sum of array elements
// probabilities[i] to probabilities[j]
function sum(probabilities, i, j)
{
    var s = 0;
    for (var k = i; k <= j; k++)
        s += probabilities[k];
    return s;
}
        /*
        const n = keys.length;
        const cost = new Array(n+1).fill(0).map(() => new Array(n).fill(0));
        for (let i = 0; i <n; i++) {
          cost[i][i] = probabilities[i];
          console.log(probabilities[i]);
        }
        
        
        console.log(cost);
      
        //return cost[1][n];
      }
      
      function sum(probabilities, i, j) {
        let sum = 0;
        for (let k = i; k <= j; k++) {
          sum += probabilities[k - 1];
        }
        return sum;
        
      }*/
      
      // Ejemplo de uso

    const ejemplo = () => {
        const cost = optimalBinarySearchTree();
        console.log("Costo óptimo de búsqueda:", cost);
    }
      

    return (
        <div>
            <header>
                <NavBar/>
            </header>
            <main>
                <h1>ejem1</h1>
                <button onClick={ejemplo}>ejemplo</button>
            </main>
        </div>
    );
}

export default OptimalSearch;