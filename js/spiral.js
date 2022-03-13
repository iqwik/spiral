"use strict"

const spiral = {
    size: 0,
    containerId: 'root',
    filledCellValue: '*',
    emptyCellValue: ' ',
    matrix: [],
    showConsoleLog: false,

    draw(props) {
        this._resetState()
        this._setState(props)
        this._createMatrix()
        this._drawSpiral()

        if (this.showConsoleLog) {
            console.log('properties', this)
        }
    },

    _resetState() {
        this.size = 0
        this.matrix = []
    },

    _setState({
        size, containerId, filledCellValue, emptyCellValue, showConsoleLog,
    }) {
        if (containerId) {
            this.containerId = containerId
        }

        if (filledCellValue) {
            this.filledCellValue = filledCellValue
        }

        if (emptyCellValue) {
            this.emptyCellValue = emptyCellValue
        }

        if (size) {
            this._setSize(size)
        }

        if (showConsoleLog) {
            this.showConsoleLog = true
        }
    },

    _setSize(size) {
        let tmpSize = parseInt(size, 10)
        // if odd -> transform to closest even number
        if (tmpSize % 2 === 1) {
            tmpSize -= 1
        }
        this.size = tmpSize
    },

    _fillCell(row, column) {
        const size = this.size
        const cellProps = { row, column, size }

        const isCenter = ___.isCenter(cellProps)
        const everyColumnBeforeCenter = ___.isColumnBeforeCenter(cellProps)
        const everyColumnAfterCenter = ___.isColumnAfterCenter(cellProps)
        const everyEvenRowAboveCenter = ___.isEvenRowAboveCenter(cellProps)
        const everyOddRowBelowCenter = ___.isOddRowBelowCenter(cellProps)

        if (everyColumnBeforeCenter || everyColumnAfterCenter || everyEvenRowAboveCenter || everyOddRowBelowCenter) {
            return this.filledCellValue
        }

        return this.emptyCellValue
    },

    _createMatrix() {
        const size = this.size
        for (let row = 0; row < size; row++) {
            this.matrix[row] = []
            for (let column = 0; column < size; column++) {
                this.matrix[row][column] = this._fillCell(row, column)
            }
        }
    },

    _drawColumns(columns) {
        let result = ''
        columns.forEach((column) => {
            result += `<td>${column}</td>`
        })
        return result
    },

    _drawRows(rows) {
        let result = ''
        rows.forEach((columns) => {
            result += `<tr>${this._drawColumns(columns)}</tr>`
        })
        return result
    },

    _drawTable() {
        return `<table>${this._drawRows(this.matrix)}</table>`
    },

    _drawSpiral() {
        document.getElementById(this.containerId).innerHTML = this._drawTable()
    }
}