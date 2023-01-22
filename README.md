# image-processing-api

This repository is created for Udacity's FSND JS track.

This project is briefly an Express server with an exposed API that takes on an image file name and using `sharp` package, resizes the image to a desired width and height.

To install dependencies, run the following command:

```
npm install
```

To build the project from the TypeScript code written, run the following command:

```
npm run build
```

To have the server up and running, run the following command:

```
node dist/index.js
```

A sample request to try out.

```
http://localhost:3000/api?fileName=fjord&width=200&height=100
```

The sample image available is `fjord.jpg` found in the directory `assets/full`.

The resized output will be found under `/assets/thumb` with the following name convention:

```
fileName_width_height.jpg
```
