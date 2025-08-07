pipeline {
    triggers {
        cron('00 21 * * 0-4')
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '20', artifactNumToKeepStr: '20'))
        disableConcurrentBuilds()
        skipDefaultCheckout()
    }

    agent {
        label 'cypress-node'
    }

    environment {
        TEST_DIR = 'cypress'
        ALLURE_PATH = 'allure-results'
        WORKSPACE_DIR = "${env.WORKSPACE}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Instalar Dependências') {
            steps {
                script {
                    sh '''
                        rm -rf node_modules package-lock.json
                        npm cache clean --force
                        mkdir -p /home/jenkins/.cache/Cypress
                        chmod -R 777 /home/jenkins/.cache/Cypress
                        wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | tee /etc/apt/trusted.gpg.d/google.asc >/dev/null
                        mkdir -p /usr/share/man/man1/
                        apt update && apt install -y default-jre openjdk-17-jdk zip
                        npm install
                        npm install @shelex/cypress-allure-plugin allure-mocha crypto-js@4.1.1 --save-dev
                    '''
                }
            }
        }

        stage('Executar') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'jenkins_registry', url: 'https://registry.sme.prefeitura.sp.gov.br/repository/sme-registry/') {
                        sh '''
                            docker pull registry.sme.prefeitura.sp.gov.br/devops/cypress-agent:14.5.2
                            docker run \
                                --rm \
                                -v "$WORKSPACE:/app" \
                                -w /app \
                                registry.sme.prefeitura.sp.gov.br/devops/cypress-agent:14.5.2 \
                                sh -c "rm -rf package-lock.json node_modules/ || true && \
                                        npm install && npm install cypress@14.5.2 cypress-cloud@beta && \
                                        npm install @shelex/cypress-allure-plugin allure-mocha crypto-js@4.1.1 --save-dev && \
                                        rm -rf allure-results/ && \
                                        npx cypress-cloud run \
                                            --browser chrome \
                                            --headed true \
                                            --record \
                                            --key somekey \
                                            --reporter mocha-allure-reporter \
                                            --ci-build-id SME-INTRANET_JENKINS-BUILD-${BUILD_NUMBER} && \
                                        chown 1001:1001 * -R && chmod 777 * -R"
                        '''
                    }

                    echo "FIM DOS TESTES!"
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
                        def hasResults = fileExists("${ALLURE_PATH}") && sh(script: "ls -A ${ALLURE_PATH} | wc -l", returnStdout: true).trim() != "0"

                        if (hasResults) {
                            echo "Gerando relatório Allure..."
                            sh """
                                export JAVA_HOME=\$(dirname \$(dirname \$(readlink -f \$(which java)))); \
                                export PATH=\$JAVA_HOME/bin:/usr/local/bin:\$PATH

                                allure generate ${ALLURE_PATH} --clean --output cypress/allure-report
                                cd cypress
                                zip -r allure-results-${BUILD_NUMBER}-\$(date +"%d-%m-%Y").zip allure-results
                            """
                        } else {
                            echo "⚠️ Diretório ${ALLURE_PATH} está ausente ou vazio. Pulando geração do relatório."
                        }
                    }
                }
            }
        }
    }

//     post {
//         always {
//             script {
//                 withDockerRegistry(credentialsId: 'jenkins_registry', url: 'https://registry.sme.prefeitura.sp.gov.br/repository/sme-registry/') {
//                     sh '''
//                         docker pull registry.sme.prefeitura.sp.gov.br/devops/cypress-agent:14.5.2
//                         docker run \
//                             --rm \
//                             -v "$WORKSPACE:/app" \
//                             -w /app \
//                             registry.sme.prefeitura.sp.gov.br/devops/cypress-agent:14.5.2 \
//                             sh -c "rm -rf package-lock.json node_modules/ || true && chown 1001:1001 * -R || true  && chmod 777 * -R || true"
//                     '''
//                 }
//             }
//         }

//         success {
//             sendTelegram("☑️ Job Name: ${JOB_NAME} \nBuild: ${BUILD_DISPLAY_NAME} \nStatus: Success \nLog: \n${env.BUILD_URL}allure")
//         }

//         unstable {
//             sendTelegram("💣 Job Name: ${JOB_NAME} \nBuild: ${BUILD_DISPLAY_NAME} \nStatus: Unstable \nLog: \n${env.BUILD_URL}allure")
//         }

//         failure {
//             sendTelegram("💥 Job Name: ${JOB_NAME} \nBuild: ${BUILD_DISPLAY_NAME} \nStatus: Failure \nLog: \n${env.BUILD_URL}allure")
//         }

//         aborted {
//             sendTelegram("😥 Job Name: ${JOB_NAME} \nBuild: ${BUILD_DISPLAY_NAME} \nStatus: Aborted \nLog: \n${env.BUILD_URL}console")
//         }
//     }
// }

// def sendTelegram(message) {
//     def encodedMessage = URLEncoder.encode(message, "UTF-8")
//     withCredentials([
//         string(credentialsId: 'telegramTokensigpae', variable: 'TOKEN'),
//         string(credentialsId: 'telegramChatIdsigpae', variable: 'CHAT_ID')
//     ]) {
//         response = httpRequest (
//             consoleLogResponseBody: true,
//             contentType: 'APPLICATION_JSON',
//             httpMode: 'GET',
//             url: "https://api.telegram.org/bot${TOKEN}/sendMessage?text=${encodedMessage}&chat_id=${CHAT_ID}&disable_web_page_preview=true",
//             validResponseCodes: '200'
//         )
//         return response
//     }
}