# Docker Compose & Kubernetes Demo

This project demonstrates a simple 3-tier application (React Frontend, Node.js API, MySQL Database) capable of running on Docker Compose or Kubernetes (Minikube).

## Prerequisites

- Docker
- Minikube
- kubectl

## Running on Minikube

1.  **Start Minikube**
    ```bash
    minikube start
    ```

2.  **Build Images in Minikube Engine**
    Important: You must build the images inside Minikube's Docker daemon so that the pods can find them (since we use `imagePullPolicy: Never`).

    ```bash
    eval $(minikube docker-env)
    docker build -t kub-api ./api
    docker build -t kub-app ./app
    ```
    *(Alternatively, use `minikube image build -t kub-api ./api` etc.)*

3.  **Apply Kubernetes Manifests**
    ```bash
    kubectl apply -f k8s/
    ```

4.  **Verify Deployment**
    Check that all pods are running:
    ```bash
    kubectl get pods
    ```

5.  **Access the Application**
    To access the **Frontend** in your browser:
    ```bash
    minikube service app-service
    ```
    To access the **API** directly (optional):
    ```bash
    minikube service api-service
    ```

## Cleanup

```bash
kubectl delete -f k8s/
minikube stop
```
