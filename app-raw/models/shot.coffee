class Shot extends Spine.Model
	@configure 'Shot', 'id', 'index', 'url', 'image_url', 'image_400_url', 'image_teaser_url', 'title', 'width', 'height', 'player'

	setup: () ->
		this.index = app.shotCount
		app.shotCount++
		this.save()

Shot.bind "create", ( shot ) ->
  shot.setup()