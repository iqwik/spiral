const handleData = ({ row, col, center, size }) => (
    (                                       // center
        row === center && col === (center % 2 === 0 ? center - 1 : center)
    )
    || (                                    // every even row above center
        row < center
        && row % 2 === 0
        && col >= row
        && col < size - row
    )
    || (                                    // every odd row below center
        row > center
        && row <= size - 1
        && row % 2 === 1
        && col <= row
        && col >= size - row
    )
    || (                                    // every column before center
        col < center
        && row > 1
        && row < size - 1
        && col % 2 === 1
        && col < center - 1
        && col < row
        && row < size - col
    )
    || (                                    // every column after center
        col > center
        && row < size - 1
        && col % 2 === 1
        && col > row
        && row > ((size - 1) - col)
    )
) ? 1 : 0

const renderSpiral = (matrix) => {
    console.log(matrix)
    matrix.forEach((row) => {
        let result = ''
        row.forEach((col) => {
            result += col === 1 ? '*' : ' '
        })
        console.log(result)
    })
}

const spiral = (size) => {
    // only works with even numbers and integers
    size = Math.round(size)
    if (size % 2 === 1) {
        size -= 1
    }
    const matrix = []
    for (let row = 0; row < size; row++) {
        matrix[row] = []
        for (let col = 0; col < size; col++) {
            matrix[row][col] = handleData({ row, col, center: size / 2, size })
        }
    }
    renderSpiral(matrix)
}

spiral(12)
