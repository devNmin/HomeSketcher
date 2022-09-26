pipeline {
    agent any


    stages {
        stage('Prepare') {
            steps {
                sh 'echo "Clonning Repository"'
                git branch: 'deploy',
                    url: 'https://lab.ssafy.com/s07-bigdata-recom-sub2/S07P22B304.git',
                    credentialsId: 'homesketcher'
            }
            post {
                success {
                     sh 'echo "Successfully Cloned Repository"'
                 }
                 failure {
                     sh 'echo "Fail Cloned Repository"'
                 }
            }
        }


        // stage('[BE]Bulid Gradle') {
        //     steps {
        //         sh 'echo "Bulid Gradle Start"'
        //         dir('BE') {
                    
        //         }
        //     }
        //     post {
        //          failure {
        //              sh 'echo "Bulid Gradle Fail"'
        //         }
        //     }
        // }

        stage('Docker stop'){
            steps {
                dir('BE'){
                    sh 'echo "Docker Container Stop"'
    //              도커 컴포즈 다운
                    // sh 'curl -L https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose'
    //              해당 도커 컴포즈 다운한 경로로 권한 설정
                    // sh 'chmod -R 777 /usr/local/bin'
                    // sh 'chmod +x /usr/local/bin/docker-compose'
    //              기존 백그라운드에 돌아가던 컨테이너 중지
                    sh 'docker compose stop'
                }


            }
            post {
                 failure {
                     sh 'echo "Docker Fail"'
                }
            }
        }

        stage('RM Docker'){
            steps {
                
                sh 'echo "Remove Docker"'

                //정지된 도커 컨테이너 찾아서 컨테이너 ID로 삭제함
                sh '''
                    result=$( docker container ls -a --filter "name=homesketcher*" -q )
                    if [ -n "$result" ]
                    then
                        docker rm $(docker container ls -a --filter "name=homesketcher*" -q)
                    else
                        echo "No such containers"
                    fi
                '''

                // homesketcher로 시작하는 이미지 찾아서 삭제함
                sh '''
                    result=$( docker images -f "reference=homesketcher*" -q )
                    if [ -n "$result" ]
                    then
                        docker rmi -f $(docker images -f "reference=homesketcher*" -q)
                    else
                        echo "No such container images"
                    fi
                '''

                // 안쓰는이미지 -> <none> 태그 이미지 찾아서 삭제함
                sh '''
                    result=$(docker images -f "dangling=true" -q)
                    if [ -n "$result" ]
                    then
                        docker rmi -f $(docker images -f "dangling=true" -q)
                    else
                        echo "No such container images"
                    fi
                '''

            }
            post {
                 failure {
                     sh 'echo "Remove Fail"'
                }
            }
        }

        stage('Bulid & Run') {
            steps {
                dir('BE'){
                    sh 'echo " Image Bulid Start"'
                    script {

//                         업데이트된 코드로 빌드 및 실행
                        sh 'docker compose up -d'
                    }
                }
            }

            post {
                failure {
                    sh 'echo "Bulid Docker Fail"'
                }
            }
        }

        

        
//         stage('[FE] prepare') {
//             steps {
//                 dir('frontend'){
//                     sh 'echo " Frontend Bulid Start"'
//                     script {
//                         sh 'docker-compose stop'
//                         sh 'docker rm vue'
//                         sh 'docker rmi frontend_vue'
//                     }
//                 }


//             }

//             post {
//                 failure {
//                     sh 'echo "Frontend Build Fail"'
//                 }
//             }
//         }
//         stage('Fronteend Build & Run') {
//             steps {
//                 dir('frontend'){
//                     sh 'echo " Frontend Build and Start"'
//                     script {

// //                         업데이트된 코드로 빌드 및 실행
//                         sh 'docker-compose up -d'
//                     }
//                 }


//             }

//             post {
//                 failure {
//                     sh 'echo "Bulid Docker Fail"'
//                 }
//             }
//         }
    }
}