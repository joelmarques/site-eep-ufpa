'use strict';

angular.module('site', [])

.controller('SiteCtrl', function ($http, variaveisGlobais) {

	var vm = this;

	vm.historicoEscolar = {};

	vm.sistema = variaveisGlobais.ambiente + 'app.html';

	vm.visitante = {};

	//carousel pesquisadores
	vm.pesquisadores = [];
	vm.pQuantidadePorSlide = 3;
	vm.pInicio = 1;
	vm.pFim = vm.pQuantidadePorSlide;

	//carousel animais
	vm.animais = [];
	vm.aQuantidadePorSlide = 6;
	vm.aInicio = 1;
	vm.aFim = vm.aQuantidadePorSlide;

	$http.get(variaveisGlobais.ambiente + 'publico/sites?identificador=' + variaveisGlobais.identificador).success(function(site) {
		vm.site = site;
		vm.visitante.identificadorDoSite = variaveisGlobais.identificador;
		vm.visitante.emailDoSite = vm.site.empresa.email;
		vm.visitante.descricaoDoSite = variaveisGlobais.descricaoDoSite;

		vm.setPesquisadores();
		vm.setAnimais();
	});

	vm.enviarMensagem = function() {

		if (vm.isVisitanteValido()) {

			var req = {
				method: 'POST',
				url: variaveisGlobais.ambiente + 'publico/sites',
				data: vm.visitante
			};

			$http(req).then(
					   function(){
						   vm.visitante.nome = null;
						   vm.visitante.email = null;
						   vm.visitante.mensagem = null;
						   alert('Mensagem enviada com sucesso!');
					   },

					   function(){
						   alert('Erro ao enviar a mensagem!');
					   });

		}

	}

	vm.isVisitanteValido = function() {
		return vm.visitante.nome != null &&
			   vm.visitante.email != null &&
			   vm.visitante.mensagem != null &&
			   vm.visitante.emailDoSite != null;
	}

	// carousel pesquisadores
	vm.setPesquisadores = function() {

		vm.pesquisadores = [];

		vm.pFim = vm.pInicio + (vm.pQuantidadePorSlide - 1);

		if (vm.pFim > vm.site.pesquisadores.length) {
			vm.pFim = vm.site.pesquisadores.length;
		}

		for (var i=vm.pInicio; i<=vm.pFim; i++) {
			vm.pesquisadores.push(vm.site.pesquisadores[i-1]);
		}
	}

	vm.pPrev = function() {
		if (vm.pInicio > 1) {
			vm.pInicio = vm.pInicio - vm.pQuantidadePorSlide;
			vm.setPesquisadores();
		}
	}

	vm.pNext = function() {
		if (vm.pFim + 1 <= vm.site.pesquisadores.length) {
			vm.pInicio = vm.pFim + 1;
			vm.setPesquisadores();
		}
	}

	// carousel animais
	vm.setAnimais = function() {

		vm.animais = [];

		vm.aFim = vm.aInicio + (vm.aQuantidadePorSlide - 1);

		if (vm.aFim > vm.site.animais.length) {
			vm.aFim = vm.site.animais.length;
		}

		for (var i=vm.aInicio; i<=vm.aFim; i++) {
			vm.animais.push(vm.site.animais[i-1]);
		}
	}

	vm.aPrev = function() {
		if (vm.aInicio > 1) {
			vm.aInicio = vm.aInicio - vm.aQuantidadePorSlide;
			vm.setAnimais();
		}
	}

	vm.aNext = function() {
		if (vm.aFim + 1 <= vm.site.animais.length) {
			vm.aInicio = vm.aFim + 1;
			vm.setAnimais();
		}
	}

	vm.buscarHistoricoEscolar = function(idAnimal) {
		$http.get(variaveisGlobais.ambiente + 'publico/sites/historicos?idAnimal=' + idAnimal).success(function(historicoEscolar) {
			vm.historicoEscolar = historicoEscolar;
			vm.carouselImagens = addImages(vm.historicoEscolar.imagens, "images");
			vm.carouselVideos = addVideos(vm.historicoEscolar.videos, "videos");
		});
	}

})

.constant('variaveisGlobais', {
	identificador: 'EEP_UFPA',
	descricaoDoSite: 'Escola Experimental de Primatas - UFPA',
	ambiente: 'http://www.terkina.com.br/'
});
