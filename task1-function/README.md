# About

Given function generates array of Stamp objects where
- offset incremented by random value
- score incremented randomly by 0/1 or 1/0 if roll is successful

Task: given array of Stamps. Find score at the specified by offset time

Assumptions: 
- getScore will be called on properly generated stamps. This would mean offset is monotonicly increasing so we could use binsearch for faster execution
- Is there is no exact offser in stamps, previos closest should be taken. In case of stamps with offsets = [ 2, 4, 5, 7, 8 ] and we are looking for offset = 6, stamp with offset=5 would be taken
- If there no offset with value less or equal then we need, zero score should be returned { offset: 0, score: 0 }
- If target offset bigger than any offset in stamps, last stamp's score should be returned

# How to run

- ```npm i```
- Add necessery function calls to main.ts
- ```npm start```

Or just simply copy main.ts file to you project and import functions
