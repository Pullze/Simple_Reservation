package com.cs4400.service_backend.config;

import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;


@Configuration
@ConditionalOnClass(Docket.class)
@Slf4j
public class SwaggerConfig {

    private static final String VERSION = "1.0";
    @Bean
    public Docket createRestApi(){
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.withClassAnnotation(Api.class))
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        log.info("\n");
        log.info("Swagger Started! Url:");
        log.info("http://localhost:8080/doc.html");
        log.info("\n");
        return new ApiInfoBuilder()
                .title("API Documentation")
                .termsOfServiceUrl("http://localhost:8080/swagger-ui/index.html")
                .description("Swagger API Documentation")
                .version(VERSION)
                .build();
    }

}

