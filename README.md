# Boards - Ecommerce Site

By Anthony McLeod
<br>
The write up is available below and on Google Docs [here](https://docs.google.com/document/d/16Mlt-OLT3XrscHIK0R0QOyE719k6n8JWnm5Jvy-DY5Q/edit?usp=sharing)
<br>
A deployed version of the application is available [here](https://salty-scrubland-87928.herokuapp.com/)

## Installation

To run the application locally, download the code to a local directory. This application uses Node.js. Please ensure that it is installed. The Node.js installation should also install npm, the package manager.

To test if you have Node.js installed, enter the following in the command line

```
node -v
```

Once the code has been downloaded, you must install the dependencies. To install the dependencies, open the command line in the application's directory and run the following npm command.

```
npm install
```

### Configuration

The application uses environment variables within the code and these must be set in order to run the application. Create a .env file in the root directory and set the following variables to the desired values.

* PUBLISHABLE_KEY: This is the public Stripe API key
* SECRET_KEY: This is the private Stripe API key

### Running  the application

After installing the dependencies and setting the environment variables, you should be able to run the application locally.

```
node index.js
```

## Write Up
### Application Overview
To demonstrate my technical aptitude, I developed a simple ecommerce application using Stripe’s API in conjunction with other popular web technologies. The front-end represents a fictitious snowboard retailer, Boards, which sells several snowboards for several rider types (e.g., freestyle, mountain, powder, etc.).

The user can browse the selection of snowboards on the main page and select “Add to Cart” to add the item to cart. The user can select the cart icon at the top right corner of the page to view the current list of cart items in a small popover window. If there are items in the cart, the popover will contain the total cart value and an option to proceed to checkout. Selecting the “Proceed to Checkout” button will navigate to a new checkout page. The checkout page will contain the cart items and a pay button, which will process the user’s credit card information and navigate to another page with the transaction results.

The application was built with Node.js, Express.js, and Bootstrap. I created a few web services to host the webpages and handle any API requests that were needed during the checkout process. There are three web pages, including the home page, checkout page, and a success page to display the transaction information. An additional Express.js route was created to charge the user’s credit card.

The payment button in the checkout page leverages Stripe’s Checkout technology (https://stripe.com/docs/checkout). Once the user has entered his or her payment information, the credit card data is sent to Stripe and a stripeToken is returned if it is validated successfully. A form is then submitted that contains the stripeToken as a body parameter. An Express.js route will handle the form’s POST service and will parse the stripeToken.

The Node.js application leverages the npm stripe module to create a charge on the user’s card with the stripeToken. Specifically, the Node.js application creates a charge object. The Stripe API allows the application to charge a credit card without handling the credit card information, which significantly reduces the risk associated with online transactions. After creating the charge object via the Node.js Stripe API, the application renders a page to display the transaction id and amount charged.

To simplify the application, I did not include a database for persistence or browser cookies. The application uses query parameters and route parameters to pass information along to subsequent pages. For example, the item ids are included in the checkout path to render the appropriate checkout page (e.g., “/checkout/3+5” indicates item 3 and 5 are in the cart).
The public and secret Stripe API keys are not hardcoded in the application for security reasons. I have included these values as environment variables in the code. The environment variables were configured on the server.

The application was deployed to Heroku and is available here: https://salty-scrubland-87928.herokuapp.com/ (Note the url is randomly created on Heroku).
 
### Approach
I began by briefly reviewing the quick start guide and the Stripe API documentation to understand how the checkout process worked. In addition to the guides, I reviewed a few examples to better understand the checkout process.

Next, I constructed the front-end with functionality to add and remove items from the cart. I then implemented Stripe’s Checkout API, that redirected the user to a Stripe checkout page. After completing the transaction, the Stripe checkout page redirects the user back to my website. However, I had difficulty retrieving the transaction ID with this architecture. I modified my checkout process to use the Stripe API to charge the user’s credit card on my web server. The returned data object included the transaction id, which was then displayed to the user.

### Language/Framework
The application was developed primarily with JavaScript. I leveraged the Node.js platform and a popular web service framework, Express.js. I selected Node.js because I am conformable developing in JavaScript and it is supported by Stripe. Specifically, I used the npm stripe package. The front-end was developed with Bootstrap because it contains numerous web ready-to-use components. In conjunction with Bootstrap, I used EJS to dynamically render components on the screen, such as products and items in the cart on the checkout page.

Once completed, I deployed the application on Heroku because it does not require a considerable amount of setup or configuration. For convenience, I have included the link here: https://salty-scrubland-87928.herokuapp.com/.

### Future Considerations / Improvements
The application could be improved in several ways, including shipping, account management, data persistence, email notifications, coupon redemption, mobile support, and international support

Currently, the user does not enter any shipping information, which is required for real ecommerce transactions involving physical products. I would extend the application by collecting the relevant shipping information in the checkout process. The application could estimate shipping costs based on the delivery address. Moreover, local tax charges could be calculated and added to the total at checkout.

The user does not have an option to login and create an account, which could streamline future transactions. In the future, I would include an account management system, allowing the user to enter his or her account with an email and password or username and password.
If we collected the user’s email address, we could leverage email services to email the user with a summary of his or her purchase. We could also include promotions or discount codes that could be used in future transactions.

The checkout process does not allow the user to enter any discount codes. This functionality can be added to the Stripe checkout process in the future.

The application front-end is not optimized for mobile. In the future, I would add support for smaller screen sizes.

A real ecommerce website may optimize its product page for different markets, or translate the text to other languages. This functionality does not exist in the current application but an internationalization file could be added to dynamically render product text for non English speaking countries.
