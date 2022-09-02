const TIMESTAMPS_COUNT = 50000;

const PROBABILITY_SCORE_CHANGED = 0.0001;

const PROBABILITY_HOME_SCORE = 0.45;

const OFFSET_MAX_STEP = 3;

type Score = {
    home: number;
    away: number;
};

type Stamp = {
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
