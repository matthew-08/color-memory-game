const randomColor = (n) => {
    const arrayOfColors = []
    for (let i = 0; i < n; i++) {
        const array = []
        for (let i = 0; i < 3; i++) {
            array.push(generateRandomIndex(255))
        }
        arrayOfColors.push(array);
    }
    return arrayOfColors
}
const generateRandomIndex = (n) => {
    return Math.floor(Math.random() * n)
}

export default randomColor