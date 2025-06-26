pipeline {
    triggers { cron('30 20 * * 0-5') }

    options {
        buildDiscarder(logRotator(numToKeepStr: '20', artifactNumToKeepStr: '20'))
        disableConcurrentBuilds()
        skipDefaultCheckout()
    }

    agent {
        kubernetes {
            label 'cypress'
            defaultContainer 'cypress-13-6-6'
        }
    }

    environment {
        TEST_DIR = "${env.WORKSPACE}"
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

        stage('Executar') {
            steps {
                script {
                    catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                        sh '''
                            NO_COLOR=1 npx cypress run \
                                --headless \
                                --spec cypress/e2e/**/* \
                                --reporter mocha-allure-reporter \
                                --browser chrome
                        '''
                    }
                }
            }
        }

        stage('Gerar Allure Report e ZIP') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
                        def hasResults = fileExists("${ALLURE_PATH}") && sh(
                            script: "ls -A ${ALLURE_PATH} | wc -l", returnStdout: true
                        ).trim() != "0"

                        if (hasResults) {
                            echo "Gerando relatório Allure e ZIP..."
                            sh """
                                export JAVA_HOME=\$(dirname \$(dirname \$(readlink -f \$(which java))))
                                export PATH=\$JAVA_HOME/bin:/usr/local/bin:\$PATH

                                allure generate ${ALLURE_PATH} --clean --output allure-report
                                zip -r allure-results-${BUILD_NUMBER}-\$(date +"%d-%m-%Y").zip ${ALLURE_PATH}
                            """
                        } else {
                            echo "⚠️ Diretório ${ALLURE_PATH} está ausente ou vazio. Pulando geração do relatório."
                        }
                    }
                }
            }
        }
    }
} 
