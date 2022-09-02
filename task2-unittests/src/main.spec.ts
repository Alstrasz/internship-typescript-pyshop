// import { generateStamps, getScore, Stamp } from './main';

// !!! WARNING: It should use imports, but for the sake of it being standalone file, imports replaced with copy of the code

const TIMESTAMPS_COUNT = 500; // changed params to be more real

const PROBABILITY_SCORE_CHANGED = 0.5;

const PROBABILITY_HOME_SCORE = 0.5;

const OFFSET_MAX_STEP = 3;

export type Score = {
    home: number;
    away: number;
};

export type Stamp = {
    offset: number;
    score: Score;
};

const emptyScoreStamp: Stamp = {
    offset: 0,
    score: {
        home: 0,
        away: 0,
    },
};

export const generateStamps = (): Stamp[] => {
    const scoreStamps = Array( TIMESTAMPS_COUNT )
        .fill( emptyScoreStamp )
        .map(
            ( ( acc ) => () => {
                const scoreChanged =
                    Math.random() > 1 - PROBABILITY_SCORE_CHANGED; // roll to see if score changed for this iteration
                const homeScoreChange =
                    scoreChanged && Math.random() < PROBABILITY_HOME_SCORE ?
                        1 :
                        0; // roll to see how home score changed for this iteration
                const awayScoreChange =
                    scoreChanged && !homeScoreChange ? 1 : 0; // get away score changed for this iteration (reverse of home if scoreChanged)
                return {
                    offset: ( acc.offset +=
                        Math.floor( Math.random() * OFFSET_MAX_STEP ) + 1 ), // incrase offset by uniforamlly random number in range [1, OFFSET_MAX_STEP]
                    score: {
                        home: ( acc.score.home += homeScoreChange ), // apply home score change
                        away: ( acc.score.away += awayScoreChange ), // apply away score change
                    },
                };
            } )( emptyScoreStamp ),
        );

    return scoreStamps;
};


export const getScore = ( gameStamps: Stamp[], offset: number ): Score => {
    if ( gameStamps.length === 0 ) {
        return {
            home: 0,
            away: 0,
        };
    } // Edge case. Can be resolved differently: throw error, return undefind, return zero element(such in this case)

    /**
     * Since offset only increases, we can use binary search. It's perofrmace O(n log(n)) much better then linear search.
     *
     * Finds k in the range [l, r] where check(k - 1) is false and check(k) = true
     *
     * @param {number} l left border of the range
     * @param {number} r right border of the range
     * @param {( m: number ) => boolean} check function called on elements of the range. Should be monotonic ( each element to the left lower or equeal to current lement.
     * In case of bool it would be check(l)=false..check(k)=false check(k+1)=true..check(r)=true, where k in range [l, r] ).
     * @return {number}
     */
    const binarySearch = ( l: number, r: number, check: ( m: number ) => boolean ) => {
        let m = Math.floor( ( r + l ) / 2 );
        while ( l < r ) {
            m = Math.floor( ( r + l ) / 2 );
            // console.log( l, r );
            if ( check( m ) ) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l;
    };

    const closestIndex = binarySearch( 0, gameStamps.length - 1, ( m: number ) => { // finds first stamp with stamp.offset >= offset
        return gameStamps[m].offset >= offset;
    } );

    const closestElement = gameStamps[closestIndex]; // get stamp

    if ( closestElement.offset > offset ) { // this will be true if there is no exact needed offset
        if ( closestIndex > 0 ) { // If somewhere in the middle of array
            return gameStamps[closestIndex - 1].score; // we get previos element. If we can't know how game at this point of time, we return the previos closest time we now
        } else {
            return { // if first offset is still bigger then one we ask, we return zero score
                home: 0,
                away: 0,
            };
        }
    } else {
        return closestElement.score; // we found what we need
    }
};

// console.log( getScore( generateStamps(), 100 ) );

// !!! WARNING: Code above probably should have been imported, but for the sake of it being standalone file, imports replaced with copy of the code

describe( 'AppController', () => {
    describe( 'run on random stamps', () => {
        let stamps: Stamp[];

        beforeEach( async () => {
            stamps = generateStamps();
        } );

        it( 'should work proerply with exact offsets', () => {
            for ( const stamp of stamps ) {
                const scoreFound = getScore( stamps, stamp.offset );
                expect( scoreFound ).toEqual( stamp.score );
            }
        } );

        it( 'should work return zeros for offset below than on first stamp', () => {
            const scoreFound = getScore( stamps, stamps[0].offset - 100 );
            expect( scoreFound ).toEqual( {
                home: 0,
                away: 0,
            } );
        } );

        it( 'should return last stamp for offset bigger than on last stamp', () => {
            const scoreFound = getScore( stamps, stamps[stamps.length - 1].offset + 100 );
            expect( scoreFound ).toEqual( stamps[stamps.length - 1].score );
        } );

        it( 'should return stamp.score for stamp with stamp.offset closest, but below offset if exact offset cant be found', () => {
            for ( let i = 0; i < stamps.length - 1; i++ ) {
                if ( stamps[i + 1].offset - stamps[i].offset > 1 ) { // due to random it cannot be guranteed, so there are test on pregenerated stamps below
                    const scoreFound = getScore( stamps, stamps[i].offset + 1 );
                    expect( scoreFound ).toEqual( stamps[i].score );
                }
            }
        } );
    } );


    describe( 'run on prepeared stamps', () => {
        let stamps: Stamp[];

        beforeEach( async () => {
            stamps = [
                { offset: 3, score: { home: 0, away: 0 } },
                { offset: 6, score: { home: 1, away: 0 } },
                { offset: 9, score: { home: 1, away: 0 } },
                { offset: 12, score: { home: 2, away: 0 } },
                { offset: 15, score: { home: 2, away: 0 } },
                { offset: 18, score: { home: 2, away: 1 } },
                { offset: 21, score: { home: 2, away: 1 } },
                { offset: 24, score: { home: 2, away: 1 } },
                { offset: 27, score: { home: 2, away: 1 } },
                { offset: 30, score: { home: 2, away: 1 } },
                { offset: 33, score: { home: 3, away: 1 } },
                { offset: 36, score: { home: 3, away: 1 } },
                { offset: 39, score: { home: 3, away: 1 } },
                { offset: 42, score: { home: 3, away: 1 } },
                { offset: 45, score: { home: 4, away: 1 } },
                { offset: 48, score: { home: 4, away: 2 } },
                { offset: 51, score: { home: 5, away: 2 } },
                { offset: 54, score: { home: 5, away: 3 } },
                { offset: 57, score: { home: 5, away: 4 } },
                { offset: 60, score: { home: 5, away: 5 } },
                { offset: 63, score: { home: 5, away: 5 } },
                { offset: 66, score: { home: 5, away: 6 } },
                { offset: 69, score: { home: 5, away: 6 } },
                { offset: 72, score: { home: 5, away: 6 } },
                { offset: 75, score: { home: 5, away: 7 } },
            ];
        } );

        it( 'should work proerply with exact offsets', () => {
            for ( const stamp of stamps ) {
                const scoreFound = getScore( stamps, stamp.offset );
                expect( scoreFound ).toEqual( stamp.score );
            }
        } );

        it( 'should work return zeros for offset below than on first stamp', () => {
            const scoreFound = getScore( stamps, stamps[0].offset - 100 );
            expect( scoreFound ).toEqual( {
                home: 0,
                away: 0,
            } );
        } );

        it( 'should return last stamp for offset bigger than on last stamp', () => {
            const scoreFound = getScore( stamps, stamps[stamps.length - 1].offset + 100 );
            expect( scoreFound ).toEqual( stamps[stamps.length - 1].score );
        } );

        it( 'should return stamp.score for stamp with stamp.offset closest, but below offset if exact offset cant be found', () => {
            for ( let i = 0; i < stamps.length; i++ ) {
                const scoreFound = getScore( stamps, stamps[i].offset + 1 );
                expect( scoreFound ).toEqual( stamps[i].score );
            }
        } );
    } );

    it( 'should return zeros for elem of length zero', () => {
        const scoreFound = getScore( [], 1 );
        expect( scoreFound ).toEqual( {
            home: 0,
            away: 0,
        } );
    } );
} );
