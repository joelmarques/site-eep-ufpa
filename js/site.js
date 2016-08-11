'use strict';

angular.module('site', ['ui.bootstrap'])

.controller('SiteCtrl', function ($http, variaveisGlobais) {

	var vm = this;

	vm.sistema = variaveisGlobais.ambiente + 'app.html';

	vm.visitante = {};

	$http.get(variaveisGlobais.ambiente + 'publico/sites?identificador=' + variaveisGlobais.identificador).success(function(site) {
		vm.site = site;
		vm.visitante.identificadorDoSite = variaveisGlobais.identificador;
		vm.visitante.emailDoSite = vm.site.empresa.email;
		vm.visitante.descricaoDoSite = variaveisGlobais.descricaoDoSite;
	});

	vm.enviarMensagem = function() {

		if (vm.isVisitanteValido()) {

			var req = {
				method: 'POST',
				url: variaveisGlobais.ambiente + 'publico/sites',
				data: vm.visitante
			}

			$http(req).then(
					   function(){
						   vm.visitante.nome = null;
						   vm.visitante.email = null;
						   vm.visitante.mensagem = null;
						   alert('Mensagem enviada com sucesso!')
					   },

					   function(){
						   alert('Erro ao enviar a mensagem!')
					   });

		}

	}

	vm.isVisitanteValido = function() {
		return vm.visitante.nome != null &&
			   vm.visitante.email != null &&
			   vm.visitante.mensagem != null &&
			   vm.visitante.emailDoSite != null;
	}

})

.constant('variaveisGlobais', {
	identificador: 'EEP_UFPA',
	descricaoDoSite: 'Escola Experimental de Primatas - UFPA',
	ambiente: 'http://www.terkina.com.br/'
});
