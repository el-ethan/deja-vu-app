import {postIncidentToDatabase} from '../api';


describe('api', () => {
    describe('postIncidentToDatabase', () => {
        it('returns null if incident content is missing', () => {
            expect(postIncidentToDatabase(undefined, undefined, undefined)).toBe(null);
        });

        it('returns incident after posting', () => {
            jest.spyOn(global, 'fetch').mockImplementation(() => console.log('posting'));
            expect(postIncidentToDatabase('a', 'b', 'c')).toEqual(
                {problem: 'a', solution: 'b', context: 'c'}
            );
        });
    });
});
