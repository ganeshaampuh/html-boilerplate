const elixir = require('laravel-elixir');
const nunjucksRender = require('gulp-nunjucks-render');

elixir.extend('nunjucts', function() {
    new elixir.Task('nunjucts', function() {
        return gulp.src('resources/views/**/*.+(html|nunjucks)')
        // Renders template with nunjucks
		.pipe(nunjucksRender({
	      	path: ['resources/templates/']
	    }))
		// output files
	    .pipe(gulp.dest('public'))
    })
    .watch(['./resources/templates/**/*', './resources/views/**/*']);
});

elixir(mix => {
	// compile views
	mix.nunjucts();
	// compile assets
    mix.sass('app.scss')
       .webpack('app.js');
    // browsersync live reload
    mix.browserSync({
    	proxy: false,
    	server: "public",
        files: ['public/*.html', 'public/css/*.css', 'public/js/*.js']
    });
});