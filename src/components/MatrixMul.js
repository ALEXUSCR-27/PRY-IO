import React from "react";
import NavBar from "./NavBar";


function MatrixMul() {

    const MatrixChainOrder = (p , n) =>
    {
        /* For simplicity of the 
        program, one extra row and
        one extra column are allocated in m.  0th row
        and 0th column of m are not used */
        let m = Array(n).fill(0).map(x => Array(n).fill(0));
     
        let i, j, k, L, q;
     
        /* m[i, j] = Minimum number of scalar
        multiplications needed to compute the matrix
        A[i]A[i+1]...A[j] = A[i..j] where
        dimension of A[i] is p[i-1] x p[i] */
     
        // cost is zero when multiplying one matrix.
        for (i = 1; i < n; i++)
            m[i][i] = 0;
     
        // L is chain length.
        for (L = 2; L < n; L++) 
        {
            for (i = 1; i < n - L + 1; i++) 
            {
                j = i + L - 1;
                if (j == n)
                    continue;
                m[i][j] = Number.MAX_VALUE;
                for (k = i; k <= j - 1; k++) 
                {
                    // q = cost/scalar multiplications
                    q = m[i][k] + m[k + 1][j]
                        + p[i - 1] * p[k] * p[j];
                    if (q < m[i][j])
                        m[i][j] = q;
                }
            }
        }
     
        return m[1][n - 1];
    }

    const ejm = () => {
        let arr = [ 20, 2, 30, 12, 8 ];
        let size = arr.length;
        console.log(MatrixChainOrder(arr, size));
    
    }

    return (
        <div>
            <header>
                <NavBar/>
            </header>
            <main>
                <h1>ejem1</h1>
                <button onClick={ejm}>ejm</button>
            </main>
        </div>
    );
}

export default MatrixMul;