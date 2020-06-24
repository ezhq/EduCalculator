new Vue({
    el: '#app',
    data: {
        equation: '0',
        isDecimalAdded: false,
        isOperatorAdded: false,
        isStarted: false,
    },
    methods: {
        // Check if the character is '+', '-', '×' or '÷'
        isOperator(character) {
            return ['+', '-', '×', '÷'].indexOf(character) > -1
        },
        // When pressed Operators or Numbers
        append(character) {
            // Start
            if (this.equation === '0' && !this.isOperator(character)) {
                if (character === '.') {
                    this.equation += '' + character
                    this.isDecimalAdded = true
                } else {
                    this.equation = '' + character
                }

                this.isStarted = true
                return
            }

            // If Number
            if (!this.isOperator(character)) {
                // . already input '.'
                if(character === '.' && this.isDecimalAdded === true) {
                    return
                }

                // . first input '.'
                if(character === '.'){
                    this.isDecimalAdded = true
                    this.isOperatorAdded = true
                } else {
                    this.isOperatorAdded = false
                }

                // 1 2 3 4 5 6 7 8 9 0
                this.equation += '' + character

            }

            // + - × ÷
            if (this.isOperator(character) && !this.isOperatorAdded) {
                this.equation += '' + character
                this.isDecimalAdded = false
                this.isOperatorAdded = true
            }
        },
        // When pressed '='
        calculate(){
            let result = this.equation.replace(new RegExp('×', 'g'), '*').replace(new RegExp('÷', 'g'), '/')

            this.equation = parseFloat(eval(result).toFixed(9)).toString()

            this.isDecimalAdded = false
            this.isOperatorAdded = false
        },
        // When pressed '+/-'
        calculateToggle() {
            if (this.isOperatorAdded || !this.isStarted) {
                return
            }
            
            this.equation = this.equation + '* -1'
            this.calculate()
        },
        // When pressed '%'
        calculatePercentage() {
            if (this.isOperatorAdded || !this.isStarted) {
                return
            }

            this.equation = this.equation + '* 0.01'
            this.calculate()
        },
        // When pressed 'AC'
        clear() {
            this.equation = '0'
            this.isDecimalAdded = false
            this.isOperatorAdded = false
            this.isStarted = false
        },
    }
})