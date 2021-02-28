# Cintsa CMS

A static site CMS built and hosted with AWS Amplify and S3.

## Related links
* [The CLI to setup a Cintsa project](https://github.com/MikeMather/cintsa-cms-cli)
* [The Blog Template Example Project](https://github.com/MikeMather/cintsa-cms-blog-template)

## Screenshots

![Main page](https://github.com/MikeMather/cintsa-cms/blob/master/screenshots/screenshot-main.png)
Home page
<br/>

![Content editor](https://github.com/MikeMather/cintsa-cms/blob/master/screenshots/screenshot-editor.png)
Content editor
<br/>

![Image select](https://github.com/MikeMather/cintsa-cms/blob/master/screenshots/screenshot-image-select.png)
Media upload
<br/>

![Workflow View](https://github.com/MikeMather/cintsa-cms/blob/master/screenshots/screenshot-workflow.png)
Workflow view
<br/>
<br/>

## How it works
Cintsa is built as a clone of Netlify and other similar CMS's that use Github as their CMS store. Cintsa works differently in that it tries to separate your content from your code. You shouldn't need to store your 100 blog posts in your repository and redeploy every time you want to make a change. Cintsa live-builds your site on the fly when you make changes directly in your site through the content editor and lets you focus on content when you're writing content, and code when you're writing code.
<br/>

### Powered by AWS
Cintsa works in your own AWS account using the Amplify Framework. Cintsa comes with S3 static website hosting, fronted by a CloudFront CDN out of the box. This means you can host your site for next-to-nothing, and the costs are relative to what you use and infinitely scalable. Cintsa uses AWS Cognito to authorize content editors on your site. Cognito comes free for the first 50,000 users, i.e. your first 50,000 content editors are free. Hope that's enough.
<br/>

### Live rebuilds
Cintsa uses AWS Lambda to rebuild your site every time content changes. That means you don't need to redeploy your whole site any time someone edits user content. We use S3 event triggers to get your site up-to-date within seconds of making changes.
<br/>

### Build with the tools you love
Cintsa is compatible with your favourite fontend tools. Cintsa uses Nunjucks to render static templates, but you can use any frontend tools you like. Take a look at the [Blog Template](https://github.com/MikeMather/cintsa-cms-blog-template) for an example of how to use SCSS and Webpack.
<br/>

### Flexible Schemas
You can define your own data schemas however you like in the content editor. That means you can use Cintsa for just about anything, blog posts, products, pages etc. All of the data in your site is available in your templates through the `global.pieces` variable.
```
<section class="post-list">
  {% for post in global.pieces.posts %}
    {{ preview.postPreview(post) }}
  {% endfor %}
</section>
```
<br/>
<br/>

# Try it out
Clone the [Blog Template](https://github.com/MikeMather/cintsa-cms-blog-template) to try it out for yourself.
