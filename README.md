# Volvo UI Technical Test

## Requirements

- I need to create two subpages: /learn/<carId> and /shop/<carId>
- Try to use [VCC-UI](https://vcc-ui.vercel.app/)
- Try to create a filter for `bodyType`
- make sure the page is accessible (https://wave.webaim.org)
- good component design
- try to not use 3rd party libs (VCC-UI is considered a internal lib, so it's fine if I use it)

## Data display
  
- Both views display a carousel. The desktop version shows two arrows and the mobile shows dots

-------

## About the project

### Component structure

This project uses (Atomic Design)[https://bradfrost.com/blog/post/atomic-web-design/]. 

### Live Demo

This project is hosted at GCP in a Cloud Run instance with automatic deploy using Cloud Build. The images are hosted at GCP Bucket. You can access the live demo [here](https://car-list-g73jthabkq-od.a.run.app/)

### Running Locally

Just clone this repo, download the dependencies using `yarn` and `yarn dev` to run in development mode.

### Hosting images

It's not mandatory host the images at GCP, you can use anything you want or just embeed then into `public/images` folder. If you decide to embeed the images you don't need to do anything, the images is already there. To host into a cloud you need to configure `NEXT_PUBLIC_IMAGE_URL` env var since we are using next image loader the resolve the address:

```
const GCPBucketLoader: ImageLoader = ({ src }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}${src}`
}
```



