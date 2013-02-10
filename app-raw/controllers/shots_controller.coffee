class ShotsController extends Spine.Controller
	view: "ShotView"
	#events: 
	#	'click' : 'onClick'
	constructor: ->
		super
		this.render()
		#console.log("Post Controller initialized", this.debug)

	render: ->
		tmpl = $("#"+this.view).tmpl( this.item )
		tmpl.css("width", app.COLUMN_WIDTH )

		height = ( app.COLUMN_WIDTH * this.item.height ) / this.item.width
		tmpl.css("height", height )
		this.el.append( tmpl ).masonry( 'appended', tmpl )
		this.el = tmpl
		this.el.click( this.onClick)
		#this.delegateEvents()

	fetch: ( userId ) ->
		$.get( User.url( userId + Task.url() + ".json" ) )
			.success ( response ) ->
				Task.refresh( response )

	remove: ->
		this.el.remove()

	onClick: =>
		app.lightbox.show( this.item  )
		#app.cleanPosts()
		#app.currentState = "author"
		#app.renderPostsByAuthor( this.item.author )