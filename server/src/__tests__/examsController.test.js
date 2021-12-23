const { convertDateFormatHtmlToDb, generateRundomString } = require('../controllers/examsController');


describe('Helper functions from examsController', () => {

    test('sholud covert date format from HTML format to DB format', () => {
        const htmlDateFormat = '2021-12-20T12:00';
        const dbDateFormat = convertDateFormatHtmlToDb(htmlDateFormat);

        expect(dbDateFormat).toBe('2021-12-20 12:00:00');
        expect(typeof(dbDateFormat)).toBe('string');
    });


    test('should return eight randoms chars in string', () => {
        const randomString = generateRundomString(8);

        expect(randomString).toHaveLength(8);
        expect(typeof(randomString)).toBe('string');
    })

});
