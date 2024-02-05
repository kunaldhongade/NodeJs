const validatePhoneNumber = (number) => {
    const re = /^\d{10}$/;
    return re.test(number)
}

module.exports = validatePhoneNumber;