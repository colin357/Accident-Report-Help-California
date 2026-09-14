# Accident Report Help — California

Static rebuild of the California landing page at accidentreporthelp.com. No build step, no framework: plain HTML, CSS and a small JavaScript file.

## Structure

```
index.html        Page markup
css/styles.css    Styles (design tokens at the top)
js/main.js        Mobile nav, request modal, form submission
assets/img/       Images (self-hosted copies of the originals)
```

## Run locally

Open `index.html` directly, or serve the folder:

```
python3 -m http.server 8080
```

## Form handling

The "Find My Report" modal validates client-side and shows the success message. To actually receive submissions, add a `data-endpoint` attribute to the form in `index.html` pointing at a form handler (Formspree, Netlify Forms, a serverless function, etc.). The script posts the fields as multipart form data.

## Notes

- Links in the footer (`/cities/...`, `/blogs`, `/privacy-policy`, `/terms-and-conditions`) point at paths that exist on the original site but are not part of this repo.
- The original page hides its FAQ section and it only contained placeholder text, so it is omitted here.
