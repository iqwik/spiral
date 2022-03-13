const ___ = {
    _getCenter(size) {
        return size / 2
    },

    isCenter({ row, column, size }) {
        const center = this._getCenter(size)
        const centerOffset = center % 2 === 0 ? center - 1 : center

        return row === center && column === centerOffset
    },

    isEvenRowAboveCenter({ row, column, size }) {
        const center = this._getCenter(size)

        return (
            row < center
            && row % 2 === 0
            && column >= row
            && column < size - row
        )
    },

    isOddRowBelowCenter ({ row, column, size }) {
        const center = this._getCenter(size)

        return (
            row > center
            && row <= size - 1
            && row % 2 === 1
            && column <= row
            && column >= size - row
        )
    },

    isColumnBeforeCenter({ row, column, size }) {
        const center = this._getCenter(size)

        return (
            column < center
            && row > 1
            && row < size - 1
            && column % 2 === 1
            && column < center - 1
            && column < row
            && row < size - column
        )
    },

    isColumnAfterCenter({ row, column, size }) {
        const center = this._getCenter(size)

        return (
            column > center
            && row < size - 1
            && column % 2 === 1
            && column > row
            && row > ((size - 1) - column)
        )
    }
}
