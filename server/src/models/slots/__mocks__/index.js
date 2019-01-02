const mockSlotsModel = {};
const generateMockData = require('../../../util/generateMockData');

mockSlotsModel.getSlots = jest.fn(() => {
    return new Promise((resolve) => {
        const rows = generateMockData(3, true);

        return resolve({ rows });
    });
});

mockSlotsModel.getFinalSlots = jest.fn(() => {
    return new Promise((resolve) => {
        const rows = generateMockData(3, true);

        return resolve({ rows });
    });
});

module.exports = mockSlotsModel;
